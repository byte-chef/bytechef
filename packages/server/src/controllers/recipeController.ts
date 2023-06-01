import { NextFunction, Request, Response } from 'express';
import { RecipeModel } from '../models/RecipeModel';

const saveRecipe = async (req: Request, res: Response, next: NextFunction) => {
  const { generatedRecipe } = res.locals;
  const { user } = req;

  const savedRecipe = RecipeModel.build({
    ...generatedRecipe,
    userId: user.id,
  });

  savedRecipe.save();

  res.locals.savedRecipe = savedRecipe;

  return next();
};

export default {
  saveRecipe,
};
