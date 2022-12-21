const { db } = require("./db");

async function getAll() {
  const [rows] = await db.query("SELECT * FROM idea");

  return rows;
}

async function insertOne(idea) {
  const { title, description, upVote, commentModeId, creatorId } = idea;
  const [result] = await db.query(
    "INSERT INTO idea (title, description, up_vote, comment_mode_id, creator_id) VALUES (?, ?, ?, ?, ?)",
    [title, description, upVote, commentModeId, creatorId]
  );

  return result.insertId;
}

async function getOne(id) {
  const [rows] = await db.query("SELECT * FROM idea WHERE id = ?", [id]);
  return rows[0];
}

async function updateOne(id, idea) {
  const { title, description, upVote, commentModeId, creatorId } = idea;
  const [result] = await db.query(
    "UPDATE idea SET title = ?, description = ?, up_vote = ?, comment_mode_id = ?, creator_id = ? WHERE id = ?",
    [title, description, upVote, commentModeId, creatorId, id]
  );

  return result.affectedRows;
}

async function deleteOne(id) {
  const [result] = await db.query("DELETE FROM idea WHERE id = ?", [id]);

  return result.affectedRows;
}

module.exports = { getAll, insertOne, getOne, updateOne, deleteOne };
