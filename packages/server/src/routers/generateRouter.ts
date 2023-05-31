import { Request, Response, Router } from 'express';
import generateController from '../controllers/generateController';
import { authenticateUser } from '../controllers/authController';

const generateRouter = Router();

generateRouter.post(
  '/',
  // authenticateUser,
  generateController.validateRequest,
  generateController.moderateRequest,
  generateController.generateRequest,
  generateController.generateImage,
  (req: Request, res: Response) => {
    res.json(res.locals.generatedRecipe);
  }
);

export default generateRouter;
