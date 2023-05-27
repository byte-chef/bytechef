import { NextFunction, Request, Response } from 'express';
import {
  validateGenerateRequest,
  validateGenerateResponse,
} from '../utils/validation';
import openai from '../utils/openai';
import { createPrompt } from '../utils/aiPrompt';
import { getImageBuffer } from '../utils/image';
import { uploadImage } from '../utils/s3';
import dotenv from 'dotenv';
import { ChatCompletionRequestMessage } from 'openai';

dotenv.config();

const validateRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('Validating request body...');

  let generateRequest;

  try {
    generateRequest = await validateGenerateRequest(req.body);
    res.locals.generationRequest = generateRequest;

    console.log('Request body validated.', generateRequest);

    return next();
  } catch (err) {
    return next({
      status: 400,
      message: `Invalid request body.`,
      log: JSON.stringify(err),
    });
  }
};

const moderateRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('Moderating request for inappropriate content...');

  const { generationRequest } = res.locals;

  const moderationString = `${generationRequest.cuisine} ${
    generationRequest.theme
  } with ${generationRequest.ingredients.join(' ')}`;

  console.log('Moderation string generated.', moderationString);

  let moderationResponse;
  try {
    moderationResponse = await openai.createModeration({
      input: moderationString,
    });
  } catch (err) {
    return next({
      status: 500,
      message: `Error moderating request.`,
      log: JSON.stringify(err),
    });
  }
  const moderationResult = moderationResponse.data.results[0];

  if (moderationResult.flagged) {
    console.log("Request was flagged by OpenAI's moderation.");
    const flaggedReasons = Object.keys(moderationResult.categories).filter(
      (category) =>
        moderationResult.categories[
          category as keyof typeof moderationResult.categories
        ] === true
    );
    return next({
      message: `Prompt failed moderation. Reasons: ${JSON.stringify(
        flaggedReasons
      )}`,
      status: 400,
      log: 'Prompt failed moderation.',
    });
  }

  console.log('Request passed moderation.');

  return next();
};

const generateRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let chatCompletion;

  try {
    const prompt = createPrompt(JSON.stringify(res.locals.generationRequest));

    console.log('Prompt generated. Sending to OpenAI...');

    chatCompletion = await openai.createChatCompletion({
      model: process.env.BC_OPENAI_MODEL || 'gpt-3.5-turbo',
      messages: prompt as ChatCompletionRequestMessage[],
    });
  } catch (err) {
    console.log('Error with AI response.', err);
    return next({
      status: 500,
      message: `Error generating prompt. ${err}`,
      log: JSON.stringify(err),
    });
  }

  const choices = chatCompletion.data.choices;
  if (!choices || choices.length === 0) {
    return next({
      status: 500,
      message: `AI did not provide response.`,
      log: JSON.stringify(chatCompletion),
    });
  }

  const responseJson = choices[0].message?.content || '';

  console.log("Received AI's response.");
  console.log("Attempting to parse AI's response...");

  let generatedRecipe;
  try {
    generatedRecipe = await JSON.parse(responseJson);
  } catch (err: any) {
    return next({
      status: 500,
      message: `AI produced invalid JSON.`,
      log: JSON.stringify(err),
    });
  }

  console.log('AI response parsed.');
  console.log('Validating AI response...');

  let validatedRecipe;

  try {
    validatedRecipe = await validateGenerateResponse(generatedRecipe);
  } catch (err) {
    return next({
      status: 500,
      message: `AI produced invalid recipe.`,
      log: JSON.stringify(err),
    });
  }

  console.log('AI response validated.');
  console.log('Receipe generated.');

  res.locals.generatedRecipe = validatedRecipe;
  return next();
};

const generateImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { generatedRecipe } = res.locals;

  console.log('Generating image...');

  let tempImageUrl;

  try {
    const imageGenerationResponse = await openai.createImage({
      prompt: generatedRecipe.imagePrompt,
      n: 1,
      size: '512x512',
    });

    tempImageUrl = imageGenerationResponse.data.data[0].url || '';
  } catch (err) {
    return next({
      status: 500,
      message: `Error generating image.`,
      log: JSON.stringify(err),
    });
  }

  console.log('Image generated.');
  console.log('Downloading image...');

  let imageBuffer: Buffer;

  try {
    imageBuffer = await getImageBuffer(tempImageUrl);
  } catch (err) {
    return next({
      status: 500,
      message: `Error downloading image.`,
      log: JSON.stringify(err),
    });
  }

  console.log('Image downloaded.');
  console.log('Uploading image to S3...');

  let imageUrl: string;
  try {
    imageUrl = await uploadImage(imageBuffer);
  } catch (err) {
    return next({
      status: 500,
      message: `Error uploading image to S3.`,
      log: JSON.stringify(err),
    });
  }

  console.log('Image uploaded to S3.', imageUrl);
  console.log('Image generation and upload complete.');

  res.locals.generatedRecipe.imageUrl = imageUrl;

  return next();
};

export default {
  validateRequest,
  moderateRequest,
  generateRequest,
  generateImage,
};
