import express from "express";
import { check, validationResult } from "express-validator";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import auth from "../middleware/auth.js";
import dotenv from "dotenv";
dotenv.config();

const userRouter = express.Router();

const secretKey = process.env.SECRET_KEY;

/**
 * @method - POST
 * @param - /signup
 * @description - Sign Up a user with username, email and password
 */
userRouter.post(
  "/signup",
  [
    check("username", "Not a valid Username").not().isEmpty(),
    check("email", "Not a valid email").isEmail(),
    check("password", "Not a valid password").isLength({ min: 8 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { username, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({
          message: "User Already Exists",
        });
      }

      user = new User({ username, email, password });

      const salt = await bcryptjs.genSalt(10);
      user.password = await bcryptjs.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(payload, secretKey, { expiresIn: 3600 }, (error, token) => {
        if (error) throw error;

        res.status(200).json({ token });
      });
    } catch (error) {
      console.log(`Error while Signing Up: ${error.message}`);
      res.status(500).send("Error when Signing Up");
    }
  }
);

/**
 * @method - POST
 * @param - /login
 * @description - Log In an exisiting user with email and password
 */

userRouter.post(
  "/login",
  [
    check("email", "Not a valid email").isEmail(),
    check("password", "Not a valid password of length 8").isLength({ min: 8 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({
        email,
      });
      if (!user)
        return res.status(400).json({
          message: `No User was found with email ${email}`,
        });

      const isMatch = await bcryptjs.compare(password, user.password);

      if (!isMatch)
        return res.status(400).json({
          message: `Incorrect Password for user ${user.email}`,
        });

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        secretKey,
        {
          expiresIn: 3600, // seconds = 1 hour
        },
        (err, token) => {
          if (err) throw err;

          res.status(200).json({
            token,
          });
        }
      );
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Could Not Log In user",
      });
    }
  }
);

/**
 * @method - Get
 * @param - /me
 * @description - Verify the token of a user
 */
userRouter.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (error) {
    res.send({ message: "Error while Fetching User" });
  }
});

export default userRouter;
