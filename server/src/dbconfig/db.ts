import { Sequelize } from "sequelize";
import { envConfig } from "../config/config.js";


export const sequelize = new Sequelize(
    envConfig.postgresUri as string,

    {
        dialect: "postgres",
    }
)