const Joi = require('joi');

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
    NODE_ENV: Joi.string()
        .allow('development', 'production', 'test', 'provision')
        .default('development'),
    SERVER_PORT: Joi.number()
        .default(8080),
    JWT_SECRET: Joi.string().required()
        .description('JWT Secret required to sign'),
    SQL_HOST: Joi.string().required()
        .description("Host that runs the SQL server"),
    SQL_USER: Joi.string().required()
        .description("User that has access to the SQL database"),
    SQL_PASSWORD: Joi.string().required()
        .description("Password to login as User on the SQL database"),
    SQL_DATABASE: Joi.string().required()
        .description("SQL database name")
}).unknown()
  .required();

const { error, value: envVars } = envVarsSchema.validate(process.env);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const config = {
    env: envVars.NODE_ENV,
    port: envVars.SERVER_PORT,
    jwtSecret: envVars.JWT_SECRET,
    sql: {
        host: envVars.SQL_HOST,
        user: envVars.SQL_USER,
        password: envVars.SQL_PASSWORD,
        database: envVars.SQL_DATABASE
    }
};

module.exports = config;
