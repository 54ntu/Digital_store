import { Sequelize } from "sequelize";
import { envConfig } from "../config/config.js";

const sequelize = new Sequelize(
  envConfig.postgresUri as string,

  {
    dialect: "postgres",
  },
);
try {
  sequelize.authenticate().then(() => {
    console.log("Database connected successfully");
  });
} catch (error) {
  console.log("Unable to connect to the database:", error);
}

export { sequelize };
