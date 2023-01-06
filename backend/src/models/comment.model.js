const { db } = require("./db");

async function getAllCommentsOfOneIdea(ideaId) {
  const [rows] = await db.query(
    "SELECT c.id, c.content, c.up_vote, c.user_id, u.pseudo, u.picture FROM comment AS c INNER JOIN idea AS i ON i.id = c.idea_id INNER JOIN user AS u ON u.id = c.user_id WHERE c.idea_id = ?",
    [ideaId]
  );

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

module.exports = {
  getAllCommentsOfOneIdea,
  insertOne,
  getOne,
  updateOne,
  deleteOne,
};
