const { db } = require("./db");

async function getAllCommentsOfOneIdea(ideaId) {
  const [rows] = await db.query(
    "SELECT c.id, c.content, c.up_vote, c.creator_id, c.creation_date, u.pseudo, u.picture FROM comment AS c INNER JOIN idea AS i ON i.id = c.idea_id INNER JOIN user AS u ON u.id = c.creator_id WHERE c.idea_id = ? ORDER BY c.creation_date DESC",
    [ideaId]
  );

  return rows;
}

async function insertOne({ ideaId, userId, content }) {
  const [result] = await db.query(
    "INSERT INTO comment (creation_date, content, creator_id, idea_id) VALUES (NOW(), ?, ?, ?)",
    [content, userId, ideaId]
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
    "UPDATE comment SET content = ?, up_vote = ?, creator_id = ?, idea_id = ?, comment_id = ? WHERE id = ?",
    [content, upVote, userId, ideaId, commentId, id]
  );

  return result.affectedRows;
}

async function deleteOne(id) {
  await db.query("UPDATE comment SET comment_id = NULL where id = ?", [id]);
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
