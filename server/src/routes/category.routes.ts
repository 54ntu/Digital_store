import express from "express"
import CategoryController from "../controller/category.controller.js";
const categoryRouter = express.Router();

categoryRouter.route("/add-category").post(CategoryController.addCategory); // Add the controller method here


export default categoryRouter;

