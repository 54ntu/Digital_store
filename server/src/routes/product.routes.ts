import express from "express";
import UserMiddleware from "../middlewares/auth.middleware.js";
import ProductController from "../controller/product.controller.js";
import upload from "../middlewares/multer.middleware.js";
const productRouter = express.Router();

productRouter.route("/add-product").post(UserMiddleware.isUserLoggedIn, UserMiddleware.isAdmin, upload.single("productImage"), ProductController.createProduct);
productRouter.route("/get-product").get(ProductController.getProduct)
productRouter.route("/get-single").get(ProductController.getSingleProduct)
productRouter.route("/update-product").patch(UserMiddleware.isUserLoggedIn, UserMiddleware.isAdmin, upload.single("productImage"), ProductController.updateProduct)
productRouter.route("/update-stock").patch(UserMiddleware.isUserLoggedIn, UserMiddleware.isAdmin, ProductController.updateProductStock)
productRouter.route("/delete-product").delete(UserMiddleware.isUserLoggedIn, UserMiddleware.isAdmin, ProductController.deleteProduct)



export default productRouter;