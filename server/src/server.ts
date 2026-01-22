import app from "./app.js";
import { envConfig } from "./config/config.js";

app.listen(envConfig.port, () => {
    console.log(`Server is running on port ${envConfig.port}`);

})