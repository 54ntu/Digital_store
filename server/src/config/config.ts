
interface EnvConfig {
    port: string | number;
    postgresUri: string | undefined;
    accessTokenSecret: string | undefined;
    accessTokenExpiry: number | undefined;
}


export const envConfig: EnvConfig = {
    port: process.env.PORT || 4000,
    postgresUri: process.env.POSTGRES_URI,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    accessTokenExpiry: parseInt(process.env.ACCESS_TOKEN_EXPIRY as string)
}