import { Request, Response, Router } from 'express';
import {
  authenticateUser,
  login,
  register,
} from '../controllers/authController';

const router = Router();

// Manual Auth Routes

router.post('/register', register, login, (req: Request, res: Response) => {
  res.status(200).json(res.locals.user);
});

router.post('/login', login, (req: Request, res: Response) => {
  res.status(200).json(res.locals.user);
});

// Other Routes

router.get('/user', authenticateUser, (req: Request, res: Response) => {
  return res.status(200).json(req.user);
});

router.get('/signout', (req: Request, res: Response) => {
  req.logout((err: any) => {
    return res.status(500).send(err);
  });
  res.status(200).send();
});

export default router;
