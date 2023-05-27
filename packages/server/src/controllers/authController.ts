import { NextFunction, Request, Response } from 'express';
import {
  UserModel as User,
  UserDocument,
  UserModel,
} from '../models/UserModel';

/**
 * This middleware function will log a user in with the provided email and password. It will then set the user's id on the session and set the user on res.locals.user. It will then call next() to allow the request to continue. If the email or password are not provided, this function will throw an error. If the email is not found in the database, or if the password does not match the password in the database, this function will throw an error.
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const user = (await User.findOne({ email })) as UserDocument;
    if (!user) {
      throw new Error('Invalid email or password - email');
    }

    const userAuthenticated = await user.comparePassword(password);
    if (!userAuthenticated) {
      throw new Error(
        `Invalid email or password - password ${userAuthenticated}`
      );
    }

    req.session.userId = user.id;
    res.locals.user = user;

    return next();
  } catch (error) {
    return next(error);
  }
};

/**
 * This middleware function will register a new user with the provided email and password. It will hash the password before saving it to the database. It will then set the user's id on the session and set the user on res.locals.user. It will then call next() to allow the request to continue.
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, displayName, password } = req.body;
    if (!email || !password || !displayName) {
      throw new Error('Email, Display Name and Password are required');
    }

    const user = new User({
      email,
      displayName,
      password,
    });

    await user.save();

    res.locals.user = user;
    req.session.userId = user.id;

    return next();
  } catch (error) {
    return next(error);
  }
};

/**
 * This middleware function closes the gap between OAuth and traditional login. If the user is not using OAuth, the the req.user will be undefined. The req.user will then be populated with the user's information by using the userID property on req.session. If there is no req.session.userID or there is not matching user in the database, this function will not error. It will simply call next() and allow the request to continue. Use this middleware with each request before using any other middleware that accesses user data on the req.user property.
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.session;
    if (!userId) {
      return next();
    }
    const user = await User.findById(userId);
    if (!user) {
      return next();
    }
    req.user = user as UserDocument;
    return next();
  } catch (error) {
    return next(error);
  }
};

/**
 * This middleware function will redirect the user to the login page if they are not authenticated. If they are authenticated, it will call next() and allow the request to continue. Note that if the route using this middleware is called by an AJAX request, the user will not be redirected. Instead, the request will fail with a 401 status code.
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user) {
    console.log('Authenticated user: ', req.user);
    return next();
  }
  res.status(401).redirect('/signin');
};
