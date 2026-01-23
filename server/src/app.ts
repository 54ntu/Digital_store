import express from 'express';
import router from './routes/user.routes.js';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//route for user

app.use("/api/v1/users", router)

export default app;