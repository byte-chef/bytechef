import { Request, Response, Router } from 'express';
import recipeController from '../controllers/recipeController';
import { authenticateUser } from '../controllers/authController';

const recipeRouter = Router();

recipeRouter.get(
  '/',
  authenticateUser,
  recipeController.getAllRecipes,
  (req: Request, res: Response) => {
    res.json(res.locals.recipes);
  }
);

export default recipeRouter;
