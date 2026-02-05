import express from 'express';
import cookieParser from 'cookie-parser';
import router from './routes/user.routes.js';
import categoryRouter from './routes/category.routes.js';
import productRouter from './routes/product.routes.js';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())


//route for user
app.use("/api/v1/users", router)

//routes for category
app.use("/api/v1/categories", categoryRouter)

//route for product
app.use("/api/v1/products", productRouter)

export default app;