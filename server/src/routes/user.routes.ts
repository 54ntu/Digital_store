import express from "express";
import UserController from "../controller/user.controller.js";
import UserMiddleware from "../middlewares/auth.middleware.js";
const router = express.Router();


router.route("/register").post(UserController.register);
router.route("/login").post(UserController.login);
router.route("/logout").post(UserMiddleware.isUserLoggedIn, UserController.logout);
router.route("/forgot-password").post(UserController.forgotPassword);
router.route("/verify-otp").post(UserController.verifyOtp)
router.route("/reset-password").post(UserController.resetPassword);


export default router;