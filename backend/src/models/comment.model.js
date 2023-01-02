const { db } = require("./db");

async function getAll() {
  const [rows] = await db.query("SELECT * FROM comment");

  return rows;
}

async function insertOne(user) {
  const { content, upVote, userId, ideaId, commentId } = user;
  const [result] = await db.query(
    "INSERT INTO comment (content, up_vote, user_id, idea_id, comment_id) VALUES (?, ?, ?, ?, ?)",
    [content, upVote, userId, ideaId, commentId]
  );

  return result.insertId;
}

async function getOne(id) {
  const [rows] = await db.query("SELECT * FROM comment WHERE id = ?", [id]);
  return rows[0];
}

async function updateOne(id, user) {
  const { content, upVote, userId, ideaId, commentId } = user;
  const [result] = await db.query(
    "UPDATE comment SET content = ?, up_vote = ?, user_id = ?, idea_id = ?, comment_id = ? WHERE id = ?",
    [content, upVote, userId, ideaId, commentId, id]
  );

  return result.affectedRows;
}

async function deleteOne(id) {
  const [result] = await db.query("DELETE FROM comment WHERE id = ?", [id]);

  return result.affectedRows;
}

module.exports = { getAll, insertOne, getOne, updateOne, deleteOne };
