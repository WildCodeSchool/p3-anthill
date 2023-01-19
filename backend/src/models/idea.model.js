const { db } = require("./db");

async function getAll() {
  const [rows] = await db.query("SELECT * FROM idea");

  return rows;
}

async function getAllOfOneTopic(commentModeTopicId) {
  // SELECT * FROM upvote_idea_user WHERE idea_id = ? AND user_id = ?

  const [rows] = await db.query(
    "SELECT * FROM IdeaData WHERE comment_mode_id = ? ",
    [commentModeTopicId]
  );
  return rows;
}

async function getOne(id) {
  const [rows] = await db.query("SELECT * FROM idea WHERE id = ?", [id]);
  return rows[0];
}

async function insertOne(body, params) {
  const { title, description } = body;
  const topicId = params;
  const [result] = await db.query(
    "INSERT INTO idea (title, description, comment_mode_id) VALUES (?, ?, ?)",
    [title, description, topicId]
  );

  if (!result.insertId) {
    return null;
  }

  return result.insertId;
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

  if (result.length === 0) {
    return null;
  }

  return result.affectedRows;
}

module.exports = {
  getAll,
  getAllOfOneTopic,
  getOne,
  insertOne,
  updateOne,
  deleteOne,
};
