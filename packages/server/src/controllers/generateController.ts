import { NextFunction, Request, Response } from 'express';
import {
  validateGenerateRequest,
  validateGenerateResponse,
} from '../utils/validation';
import openai, { createChatCompletion } from '../utils/openai';
import { createPrompt } from '../utils/aiPrompt';

const validateRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('Validating request body...');

  let generateRequest;

  try {
    generateRequest = await validateGenerateRequest(req.body);
    res.locals.generateRequest = generateRequest;

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
  let moderationResponse;
  try {
    moderationResponse = await openai.createModeration({
      input: JSON.stringify(res.locals.generateRequest),
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
    const flaggedReasons = Object.keys(moderationResult.categories).filter(
      (category) => moderationResult.categories[category] === true
    );
    return next({
      message: `Prompt failed moderation. Reasons: ${JSON.stringify(
        flaggedReasons
      )}`,
      status: 400,
      log: 'Prompt failed moderation.',
    });
  }
  return next();
};

const generateRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let chatCompletion;

  try {
    const prompt = createPrompt(JSON.stringify(res.locals.generateRequest));

    console.log('Prompt generated. Sending to OpenAI...');

    chatCompletion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: prompt,
    });
  } catch (err) {
    console.log('Error with AI response.', err);
    return next({
      status: 500,
      message: `Error generating prompt. ${err}`,
      log: JSON.stringify(err),
    });
  }

  const responseJson = chatCompletion.data.choices[0].message.content;

  console.log("Received AI's response.", responseJson);
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

  console.log('AI response parsed.', generatedRecipe);
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

  console.log('AI response validated.', validatedRecipe);

  res.locals.generatedRecipe = validatedRecipe;
  return next();
};

export default {
  validateRequest,
  moderateRequest,
  generateRequest,
};
