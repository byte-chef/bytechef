import { NextFunction, Request, Response } from 'express';
import { RecipeModel } from '../models/RecipeModel';

const getAllRecipes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user } = req;

  try {
    const recipes = await RecipeModel.find({ userId: user.id });
    res.locals.recipes = recipes;

    return next();
  } catch (error) {
    return next({
      log: `Error retrieving recipes from db: ${error}`,
      message: 'Server Error',
      status: 500,
    });
  }
};

const getRecipeById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { user } = req;

  try {
    const recipe = await RecipeModel.findById({ _id: id, userId: user.id });

    if (!recipe) {
      return next({
        log: `Recipe not found: ${recipe}`,
        message: 'Client Error',
        status: 404,
      });
    }

    res.locals.recipe = recipe;

    return next();
  } catch (error) {
    return next({
      log: `Error retrieving recipe from db: ${error}`,
      message: 'Server Error',
      status: 500,
    });
  }
};

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
  getAllRecipes,
  getRecipeById,
  saveRecipe,
};
