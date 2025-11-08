import mysql from "mysql2";
import dotenv from "dotenv";

// Inicializamos dotenv
dotenv.config();

// Creamos una connection pool, que mantiene conexiones activas
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default db;
