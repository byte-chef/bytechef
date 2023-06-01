import { Request, Response, Router } from 'express';
import generateController from '../controllers/generateController';
import { authenticateUser } from '../controllers/authController';
import recipeController from '../controllers/recipeController';

const generateRouter = Router();

generateRouter.post(
  '/',
  // authenticateUser,
  generateController.validateRequest,
  generateController.moderateRequest,
  generateController.generateRequest,
  generateController.generateImage,
  recipeController.saveRecipe,
  (req: Request, res: Response) => {
    res.json(res.locals.savedRecipe);
  }
);

export default generateRouter;
