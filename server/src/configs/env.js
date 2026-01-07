import dotenv from 'dotenv/config';

const env = {
    port: process.env.PORT || 3000,
    hostname: process.env.HOSTNAME || 'localhost',
    node_env: process.env.NODE_ENV || 'development',
}

export default env;