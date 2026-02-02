import "dotenv/config";
import app from "./app.js";
import { envConfig } from "./config/config.js";
import { sequelize } from "./dbconfig/db.js";
import adminSeeder from "./adminSeeder.js";




try {
    sequelize.authenticate().then(() => {
        console.log("Database connected successfully");
        adminSeeder();  //seed the admin user when the server starts
        app.listen(envConfig.port, () => {
            console.log(`Server is running on port ${envConfig.port}`);

        })
    });
} catch (error) {
    console.log("Unable to connect to the database:", error);
}




