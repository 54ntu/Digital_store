import express from "express"
import CategoryController from "../controller/category.controller.js";
const categoryRouter = express.Router();

categoryRouter.route("/add-category").post(CategoryController.addCategory);
categoryRouter.route("/get-categories").get(CategoryController.getAllCategories);


export default categoryRouter;

