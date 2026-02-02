import express from 'express';
import cookieParser from 'cookie-parser';
import router from './routes/user.routes.js';
import categoryRouter from './routes/category.routes.js';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())


//route for user
app.use("/api/v1/users", router)

//routes for category
app.use("/api/v1/categories", categoryRouter)

export default app;