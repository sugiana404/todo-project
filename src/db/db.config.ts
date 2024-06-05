import { Sequelize } from "sequelize";
import { config } from "../config/env.variable.config.js";
const sequelize = new Sequelize(
  config.DB_NAME,
  config.DB_USER,
  config.DB_PASSWORD,
  {
    host: "localhost",
    port: 5432,
    dialect: "postgres",
    logging: false,
  }
);

export { sequelize };
