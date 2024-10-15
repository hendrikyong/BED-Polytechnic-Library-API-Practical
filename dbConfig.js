require("dotenv").config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: process.env.TRUSTSERVERCERTIFICATE === "true",
    trustServerCertificate: process.env.TRUSTSERVERCERTIFICATE === "true",
    port: parseInt(process.env.DB_PORT) || 1433,
    connectionTimeout: parseInt(process.env.CONNECTIONTIMEOUT) || 60000,
  },
};

module.exports = config;
