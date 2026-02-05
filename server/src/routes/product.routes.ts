import express from "express";
import UserMiddleware from "../middlewares/auth.middleware.js";
import ProductController from "../controller/product.controller.js";
import upload from "../middlewares/multer.middleware.js";
const productRouter = express.Router();

productRouter.route("/add-product").post(UserMiddleware.isUserLoggedIn, UserMiddleware.isAdmin, upload.single("productImage"), ProductController.createProduct);



export default productRouter;