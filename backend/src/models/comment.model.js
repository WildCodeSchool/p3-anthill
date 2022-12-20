const { db } = require("./db");

async function getAll() {
  const [rows] = await db.query("SELECT * FROM user");

  return rows;
}

async function insertOne(user) {
  const { content, like, userId, password } = user;
  const [result] = await db.query(
    "INSERT INTO user (content, like, user_id, password) VALUES (?, ?, ?, ?)",
    [content, like, userId, password]
  );

  return result.insertId;
}

async function getOne(id) {
  const [rows] = await db.query("SELECT * FROM user WHERE id = ?", [id]);
  return rows[0];
}

async function updateOne(id, user) {
  const { content, like, userId, password } = user;
  const [result] = await db.query(
    "UPDATE user SET content = ?, like = ?, user_id = ?, password = ? WHERE id = ?",
    [content, like, userId, password, id]
  );

  return result.affectedRows;
}

async function deleteOne(id) {
  const [result] = await db.query("DELETE FROM user WHERE id = ?", [id]);

  return result.affectedRows;
}

module.exports = { getAll, insertOne, getOne, updateOne, deleteOne };
