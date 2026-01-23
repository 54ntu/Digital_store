import { DataTypes } from "sequelize"
import { sequelize } from "../dbconfig/db.js"


const User = sequelize.define(
    "User",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },

        username: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        role: {
            type: DataTypes.ENUM("customer", "admin"),
            defaultValue: "customer"
        },
        otp: DataTypes.STRING,
        otpGeneratedTime: DataTypes.STRING,


    },
    {
        tableName: "users",
        timestamps: true,
    }
)


export default User;