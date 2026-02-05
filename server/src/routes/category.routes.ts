import express from "express"
import CategoryController from "../controller/category.controller.js";
import UserMiddleware from "../middlewares/auth.middleware.js";
const categoryRouter = express.Router();

categoryRouter.route("/add-category").post(UserMiddleware.isUserLoggedIn, UserMiddleware.isAdmin, CategoryController.addCategory);
categoryRouter.route("/get-categories").get(CategoryController.getAllCategories);
categoryRouter.route("/update-category/:id").patch(UserMiddleware.isUserLoggedIn, UserMiddleware.isAdmin, CategoryController.updateCategory);
categoryRouter.route("/delete-category/:id").delete(UserMiddleware.isUserLoggedIn, UserMiddleware.isAdmin, CategoryController.deleteCategory);


export default categoryRouter;

