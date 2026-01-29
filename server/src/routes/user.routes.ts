import express from "express";
import UserController from "../controller/user.controller.js";
import verifyToken from "../middlewares/auth.middleware.js";
const router = express.Router();


router.route("/register").post(UserController.register);
router.route("/login").post(UserController.login);
router.route("/logout").post(verifyToken, UserController.logout);
router.route("/forgot-password").post(UserController.forgotPassword);


export default router;