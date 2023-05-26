import dbConfig from "../config/db.config.js";
import Sequelize from "sequelize";

const sequelize = new Sequelize(dbConfig.db, dbConfig.user, dbConfig.pwd, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  logging: dbConfig.logging
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

export default db;
