import pool from "../db.js";

const readFile = async (path) => {
  const { promises: fs } = await import("fs");
  return fs.readFile(path, "utf-8");
};

const migration = async () => {
  const client = await pool.connect();

  try {
    const sql = await readFile("./src/migration/users.sql");
    console.log("COMEÇOU MIGRATION")
    await client.query("BEGIN");
    await client.query("DROP TABLE IF EXISTS users");
    await client.query(sql);
    await client.query("COMMIT");
    console.log("TERMINOU MIGRATION")
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
   return client.release();
  }
};

migration();