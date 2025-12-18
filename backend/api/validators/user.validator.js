import { body } from "express-validator";
import { User } from "../models/user.model.js";

/* -----------------------------
   Strong Password Regex
----------------------------- */
const strongPasswordRegex =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

/* -----------------------------
   Register Validation
----------------------------- */
export const registerValidator = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address")
    .custom(async (email) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error("Email already registered");
      }
      return true;
    }),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .matches(strongPasswordRegex)
    .withMessage(
      "Password must be at least 6 characters long and include 1 uppercase letter, 1 number, and 1 special character"
    ),

  body("phoneNumber")
    .optional()
    .isMobilePhone("any")
    .withMessage("Invalid phone number"),
];

/* -----------------------------
   Login Validation
----------------------------- */
export const loginValidator = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email"),

  body("password").notEmpty().withMessage("Password is required"),
];

/* -----------------------------
   Update Profile Validation
----------------------------- */
export const updateProfileValidator = [
  body("name")
    .optional()
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters"),

  body("phoneNumber")
    .optional()
    .isMobilePhone("any")
    .withMessage("Invalid phone number"),

  body("bio")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Bio must be under 500 characters"),

  body("password")
    .optional()
    .matches(strongPasswordRegex)
    .withMessage(
      "Password must contain 1 uppercase, 1 number, and 1 special character"
    ),
];
