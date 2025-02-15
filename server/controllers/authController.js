import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator"; // Import validation middleware

// Signup Controller
export const signup = [
  // Validate request body
  body("username").notEmpty().withMessage("Username is required").isLength({min:3}).withMessage("Username must be at least 3 characters"),
  body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid email format"),
  body("password").notEmpty().withMessage("Password is required").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); // Return validation errors
      }

      const { username, email, password } = req.body;

      // Check if user exists (more efficient check)
      const existingUser = await User.findOne({ $or: [{ email }, { username }] });
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }

      // Hash password (consider a salt round other than 10 for more security)
      const hashedPassword = await bcrypt.hash(password, 12); // Increased salt rounds

      // Create user
      const user = await User.create({ username, email, password: hashedPassword });

      // Generate JWT token (after successful signup)
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" }); // Token expires in 7 days

      res.status(201).json({ message: "User registered successfully", token, user: { username: user.username, email: user.email } }); // Include token in response
    } catch (err) {
      console.error(err); // Log the error for debugging
      res.status(500).json({ error: "Server error" }); // Generic error message for security
    }
  },
];


// Login Controller
export const login = [
  body("username").notEmpty().withMessage("Username or Email is required"), //Either Username or email can be used
  body("password").notEmpty().withMessage("Password is required"),
  async (req, res) => {

    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); // Return validation errors
      }
      const { username, password } = req.body; // username or email

      // Find user by username or email
      const user = await User.findOne({ $or: [{ email: username }, { username }] }); // Modified to accept username or email
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" }); // Consistent error message
      }

      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid credentials" }); // Consistent error message
      }

      // Generate JWT token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" }); // Token expires in 7 days

      // Send token as HTTP-only cookie (consider secure: true in production)
      res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: "strict", maxAge: 7 * 24 * 60 * 60 * 1000 }); // Setting the maxAge
      res.json({ message: "Login successful", user: { username: user.username, email: user.email } });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  },
];


// Logout Controller
export const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logout successful" });
};