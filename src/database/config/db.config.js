import { config } from "dotenv"
config()

const envConfigs = {
  development: {
    db: process.env.DB_NAME,
    user: process.env.DB_USER,
    pwd: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false,
  },
  test: {
    db: process.env.DB_TEST_NAME,
    user: process.env.DB_USER,
    pwd: process.env.DB_PASSWORD,
    host: process.env.DB_TEST_HOST,
    dialect: "postgres",
    logging: false,
  },
  production: {},
};

let envConfig = envConfigs.development;
if (process.env.NODE_ENV === "test") {
  envConfig = envConfigs.test;
}

export default envConfig;