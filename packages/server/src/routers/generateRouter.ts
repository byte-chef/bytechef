import { Request, Response, Router } from 'express';
import generateController from '../controllers/generateController';

const generateRouter = Router();

generateRouter.post(
  '/',
  generateController.validateRequest,
  generateController.moderateRequest,
  generateController.generateRequest,
  generateController.generateImage,
  (req: Request, res: Response) => {
    res.json(res.locals.generatedRecipe);
  }
);

export default generateRouter;
