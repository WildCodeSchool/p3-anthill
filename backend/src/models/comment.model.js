const { db } = require("./db");

async function getAllCommentsOfOneIdea(ideaId) {
  const [rows] = await db.query(
    "SELECT * FROM CommentData WHERE idea_id = ? ORDER BY creation_date DESC",
    [ideaId]
  );

  return rows;
}

async function insertOne({ content, creatorId, ideaId }) {
  const [result] = await db.query(
    "INSERT INTO comment (creation_date, content, creator_id, idea_id) VALUES (NOW(), ?, ?, ?)",
    [content, creatorId, ideaId]
  );

  return result.insertId;
}

async function getOne(id) {
  const [rows] = await db.query("SELECT * FROM CommentData WHERE id = ?", [id]);
  return rows[0];
}

async function updateOne(id, user) {
  const { content, upVote, userId, ideaId, commentId } = user;
  const [result] = await db.query(
    "UPDATE comment SET content = ?, up_vote = ?, creator_id = ?, idea_id = ?, comment_id = ? WHERE id = ?",
    [content, upVote, userId, ideaId, commentId, id]
  );

  return result.affectedRows;
}

async function deleteOne(id) {
  const [result] = await db.query("DELETE FROM comment WHERE id = ?", [id]);

  if (result.length === 0) {
    return null;
  }

  return result.affectedRows;
}

module.exports = {
  getAllCommentsOfOneIdea,
  insertOne,
  getOne,
  updateOne,
  deleteOne,
};
