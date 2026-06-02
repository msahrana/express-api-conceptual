import dotenv from 'dotenv';
import { env } from 'process';

dotenv.config({ quiet: true });

const config = {
    port: env.PORT as string,
    database_url: env.DATABASE_URL as string,
    node_env: env.NODE_ENV as string,
    jwt_token: env.JWT_TOKEN as string,
    refresh_token: env.REFRESH_TOKEN as string,
};

export default config;
