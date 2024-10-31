require("dotenv").config();
const { Sequelize } = require("sequelize");
module.exports = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: "mysql",
    host: "mysql-2b6d43eb-canvas-project.j.aivencloud.com",
    port: 12157,
    logging:false
  }
);