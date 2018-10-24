import dotenv from 'dotenv';

dotenv.config();

const config = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_DEV,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    PORT: 5000,
    dialect: 'postgres',   
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_TEST,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT, 
    dialect: 'postgres',   
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    port: process.env.PORT,
    },    
};

export default config;

