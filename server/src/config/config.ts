
interface EnvConfig {
    port: string | number;
    postgresUri: string | undefined;
    accessTokenSecret: string;
    accessTokenExpiry: string;
    useremail: string;
    useremailpassword: string;
}


export const envConfig: EnvConfig = {
    port: process.env.PORT || 4000,
    postgresUri: process.env.POSTGRES_URI,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET!,
    accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRY!,
    useremail: process.env.USER_EMAIL!,
    useremailpassword: process.env.USER_EMAIL_PASSWORD!
}