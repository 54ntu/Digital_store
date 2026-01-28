import { Sequelize } from "sequelize-typescript"
import { envConfig } from "../config/config.js";
import User from "../models/user.model.js";

// const sequelize = new Sequelize(
//   envConfig.postgresUri as string,

//   {
//     dialect: "postgres",
//   },
// );


const sequelize = new Sequelize(envConfig.postgresUri as string, {
  models: [User]    //this will automatically import all models defined in the models folder
})


try {
  sequelize.authenticate().then(() => {
    console.log("Database connected successfully");
  });
} catch (error) {
  console.log("Unable to connect to the database:", error);
}

sequelize.sync({ force: false, alter: false }).then(() => {    //this will create the table if it doesn't exist (and do nothing if it already exists)
  console.log("all models synced successfully");
})

export { sequelize };
