import { NextFunction, Request, Response } from 'express';
import { RecipeModel } from '../models/RecipeModel';

const saveRecipe = async (req: Request, res: Response, next: NextFunction) => {
  const { generatedRecipe } = res.locals;
  const { user } = req;

  if (!generatedRecipe) {
    return next({
      log: `Error retrieving generated recipe: ${generatedRecipe}`,
      message: 'Server Error',
      status: 500,
    });
  }

  if (!user) {
    return next({
      log: `Error retrieving user: ${user}`,
      message: 'Server Error',
      status: 500,
    });
  }

  try {
    const savedRecipe = RecipeModel.build({
      ...generatedRecipe,
      userId: user.id,
    });

    savedRecipe.save();

    res.locals.savedRecipe = savedRecipe;

    return next();
  } catch (error) {
    return next({
      log: `Error saving recipe to db: ${error}`,
      message: 'Server Error',
      status: 500,
    });
  }
};

export default {
  saveRecipe,
};
