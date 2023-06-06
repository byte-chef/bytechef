import Joi from 'joi';

export const generateRequestSchema = Joi.object({
  ingredients: Joi.array().items(Joi.string().required()).required(),
  allowOtherIngredients: Joi.boolean().required(),
  cuisine: Joi.string().optional().default('any'),
  servings: Joi.number().optional().default(4),
  theme: Joi.string().optional().default('any'),
});

export const validateGenerateRequest = async (data: any) => {
  return await generateRequestSchema.validateAsync(data);
};

export const generateResponseSchema = Joi.object({
  ingredients: Joi.array().items(Joi.string().required()).required(),
  instructions: Joi.array().items(Joi.string().required()).required(),
  name: Joi.string().required(),
  servings: Joi.number().required(),
  time: Joi.number().required(),
  description: Joi.string().required(),
  imagePrompt: Joi.string().required(),
});

export const validateGenerateResponse = async (data: any) => {
  return await generateResponseSchema.validateAsync(data);
};
