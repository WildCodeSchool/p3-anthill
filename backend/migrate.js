require("dotenv").config();

const fs = require("fs");
const mysql = require("mysql2/promise");

const migrate = async () => {
  const { DB_HOST, DB_USER, DB_PASSWORD } = process.env;

  const connection = await mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    multipleStatements: true,
  });

  const sql = fs.readFileSync(`./init.sql`, "utf8");
  await connection.query(sql);

  const sql1 = fs.readFileSync(`./create.sql`, "utf8");
  await connection.query(sql1);

  const sql2 = fs.readFileSync(`./seed.sql`, "utf8");
  await connection.query(sql2);

  connection.end();
};

try {
  migrate();
} catch (err) {
  console.error(err);
}
