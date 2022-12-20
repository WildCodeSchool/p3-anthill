const { db } = require("./db");

async function getAll() {
  const [rows] = await db.query("SELECT * FROM mood");

  return rows;
}

async function insertOne(mood) {
  const { name, emoji } = mood;
  const [result] = await db.query(
    "INSERT INTO mood (name, emoji) VALUES (?, ?)",
    [name, emoji]
  );

  return result.insertId;
}

async function getOne(id) {
  const [rows] = await db.query("SELECT * FROM mood WHERE id = ?", [id]);
  return rows[0];
}

async function updateOne(id, mood) {
  const { name, emoji } = mood;
  const [result] = await db.query(
    "UPDATE mood SET name = ?, email = ?, fullname = ?, password, googlemoodId = ? WHERE id = ?",
    [name, emoji, id]
  );

  return result.affectedRows;
}

async function deleteOne(id) {
  const [result] = await db.query("DELETE FROM mood WHERE id = ?", [id]);

  return result.affectedRows;
}

module.exports = { getAll, insertOne, getOne, updateOne, deleteOne };
