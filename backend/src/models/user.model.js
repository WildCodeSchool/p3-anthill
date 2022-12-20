const { db } = require("./db");

async function getAll() {
  const [rows] = await db.query("SELECT * FROM user");

  return rows;
}

async function insertOne(user) {
  const { picture, email, fullname, password, googleUserId } = user;
  const [result] = await db.query(
    "INSERT INTO user (picture, email, fullname, password, googleUserId) VALUES (?, ?, ?, ?, ?)",
    [picture, email, fullname, password, googleUserId]
  );

  return result.insertId;
}

async function getOne(id) {
  const [rows] = await db.query("SELECT * FROM user WHERE id = ?", [id]);
  return rows[0];
}

async function updateOne(id, user) {
  const { picture, email, fullname, password, googleUserId } = user;
  const [result] = await db.query(
    "UPDATE user SET picture = ?, email = ?, fullname = ?, password, googleUserId = ? WHERE id = ?",
    [picture, email, fullname, password, googleUserId, id]
  );

  return result.affectedRows;
}

async function deleteOne(id) {
  const [result] = await db.query("DELETE FROM user WHERE id = ?", [id]);

  return result.affectedRows;
}

module.exports = { getAll, insertOne, getOne, updateOne, deleteOne };
