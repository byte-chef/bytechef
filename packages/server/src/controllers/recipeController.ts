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
  } catch (error) {
    return next({
      log: `Error retrieving recipes from db: ${error}`,
      message: 'Server Error',
      status: 500,
    });
  }

  return next();
};

const getRecipeById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { user } = req;

  try {
    const recipe = await RecipeModel.findOne({ _id: id, userId: user.id });

    if (!recipe) {
      return next({
        log: `Recipe not found: ${recipe}`,
        message: 'Client Error',
        status: 404,
      });
    }

    res.locals.recipe = recipe;
  } catch (error) {
    return next({
      log: `Error retrieving recipe from db: ${error}`,
      message: 'Server Error',
      status: 500,
    });
  }

  return next();
};

const deleteRecipeById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { user } = req;

  try {
    const recipe = await RecipeModel.findOneAndDelete({
      _id: id,
      userId: user.id,
    });

    if (!recipe) {
      return next({
        log: `Recipe not found: ${recipe}`,
        message: 'Client Error',
        status: 404,
      });
    }

    res.locals.recipe = recipe;
  } catch (error) {
    return next({
      log: `Error deleting recipe from db: ${error}`,
      message: 'Server Error',
      status: 500,
    });
  }

  return next();
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
    console.log('Saving recipe to database...');

    const savedRecipe = RecipeModel.build({
      ...generatedRecipe,
      userId: user.id,
    });
    await savedRecipe.save();
    res.locals.savedRecipe = savedRecipe;
    console.log('Receipe saved.');
  } catch (error) {
    return next({
      log: `Error saving recipe to db: ${error}`,
      message: 'Server Error',
      status: 500,
    });
  }

  return next();
};

export default {
  getAllRecipes,
  getRecipeById,
  deleteRecipeById,
  saveRecipe,
};
