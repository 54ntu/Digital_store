import express from "express";
import UserController from "../controller/user.controller.js";
const router = express.Router();


router.route("/register").post(UserController.register);


export default router;