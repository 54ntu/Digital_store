import { Sequelize } from "sequelize-typescript"
import { envConfig } from "../config/config.js";
import User from "../models/user.model.js";
import PasswordResetSession from "../models/passwordResetSession.model.js";
import { Product } from "../models/product.model.js";
import { Category } from "../models/category.model.js";
import Order from "../models/ordermodel.js";
import { OrderDetail } from "../models/orderDetails.model.js";

// const sequelize = new Sequelize(
//   envConfig.postgresUri as string,

//   {
//     dialect: "postgres",
//   },
// );


const sequelize = new Sequelize(envConfig.postgresUri as string, {
  models: [User, PasswordResetSession, Product, Category, Order, OrderDetail]    //this will automatically import all models defined in the models folder
})




sequelize.sync({ force: false, alter: true }).then(() => {    //this will create the table if it doesn't exist (and do nothing if it already exists)
  console.log("all models synced successfully");
})



export { sequelize };
