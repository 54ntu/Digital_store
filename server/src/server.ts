import "dotenv/config";
import app from "./app.js";
import { envConfig } from "./config/config.js";
import { sequelize } from "./dbconfig/db.js";


app.get("/", (req, res) => {
    res.send({
        mesage: "hello from backend"
    })
})


try {
    sequelize.authenticate();
    console.log("Database connected successfully");
    app.listen(envConfig.port, () => {
        console.log(`Server is running on port ${envConfig.port}`);

    })

} catch (error) {
    console.log("Unable to connect to the database:", error);
}



