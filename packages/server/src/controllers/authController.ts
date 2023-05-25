import { UserModel } from '../models/userModel';

const authController = {
  async registerUser(req, res, next) {
    const { email, displayName, password } = req.body;

    // Verify that user (via email) does not already exist
    try {
      const user = await UserModel.findOne({ email });
      if (user) {
        return next({
          log: 'Email already exists.',
          status: 400,
          message: {
            err: 'Email already exists.',
          },
        });
      }
    } catch (err) {
      return next({
        log: `Error in registerUser: ${err}`,
        status: 500,
        message: {
          err: 'Error occurred while trying to create new user in database.',
        },
      });
    }

    // Create new user in the database and save to res.locals
    try {
      const user = await UserModel.create({
        email,
        password,
        displayName,
      });
      await user.save();

      res.locals.user = user;
      return next();
    } catch (err) {
      return next({
        log: `Error in registerUser: ${err}`,
        status: 500,
        message: {
          err: 'Error occurred while trying to create new user in database.',
        },
      });
    }
  },
  
  async loginUser(req, res, next) {
    const { username, password } = req.body;

    try {
      const user = await UserModel.findOne({ username });

      // Password compare handled by model method
      const authenticated = await user.comparePassword(password);
      console.log('authenticated: ', authenticated);
      if (!authenticated) {
        // This error will be caught by the catch block below
        throw new Error('Incorrect email or password.');
      }

      res.locals.user = user;
      return next();
    } catch (err) {
      return next({
        log: `Error in loginUser: ${err}`,
        status: 400,
        message: {
          err: 'Incorrect email or password.',
        },
      });
    }
  },
  },
};
