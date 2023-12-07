import pg from "pg";
import dotenv from "dotenv";
dotenv.config();
const { Pool } = pg;

const config = {
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: `${process.env.DB_PASSWORD}`,
};
const pool = new Pool(config);

export default pool;
