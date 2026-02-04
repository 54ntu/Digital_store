import express from "express"
import CategoryController from "../controller/category.controller.js";
const categoryRouter = express.Router();

categoryRouter.route("/add-category").post(CategoryController.addCategory);
categoryRouter.route("/get-categories").get(CategoryController.getAllCategories);
categoryRouter.route("/update-category/:id").patch(CategoryController.updateCategory);
categoryRouter.route("/delete-category/:id").delete(CategoryController.deleteCategory);


export default categoryRouter;

