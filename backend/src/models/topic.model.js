const { db } = require("./db");

async function getAll() {
  const [rows] = await db.query("SELECT * FROM topic");

  return rows;
}

async function insertOne(topic) {
  const { deadline, description, isPrivate, creatorId, title, isClosed } =
    topic;
  const [result] = await db.query(
    "INSERT INTO topic (deadline, description, is_private, creator_id, title, is_closed) VALUES (?, ?, ?, ?, ?, ?)",
    [deadline, description, isPrivate, creatorId, title, isClosed]
  );

  return result.insertId;
}

async function getOne(id) {
  const [rows] = await db.query("SELECT * FROM topic WHERE id = ?", [id]);
  return rows[0];
}

async function updateOne(id, topic) {
  const { deadline, description, isPrivate, creatorId, title, isClosed } =
    topic;
  const [result] = await db.query(
    "UPDATE topic SET deadline = ?, description = ?, is_private = ?, creator_id = ?, title = ?, is_closed= ? WHERE id = ?",
    [deadline, description, isPrivate, creatorId, title, isClosed, id]
  );

  return result.affectedRows;
}

async function deleteOne(id) {
  const [result] = await db.query("DELETE FROM topic WHERE id = ?", [id]);

  return result.affectedRows;
}

module.exports = { getAll, insertOne, getOne, updateOne, deleteOne };
