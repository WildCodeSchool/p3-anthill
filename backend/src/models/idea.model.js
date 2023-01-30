const { db } = require("./db");

async function getAll() {
  const [rows] = await db.query("SELECT * FROM idea");

  return rows;
}
async function getAllOfOneTopic(userId, commentModeTopicId) {
  const [rows] = await db.query(
    "SELECT id.*, IF(ui.user_id IS NULL, true, false) AS canVote FROM IdeaData AS id LEFT JOIN upvote_idea_user AS ui ON ui.idea_id = id.id AND ui.user_id = ? WHERE id.comment_mode_id = ? ORDER BY nbr_upvotes_idea DESC",
    [userId, commentModeTopicId]
  );
  return rows;
}

async function getOne(id) {
  const [rows] = await db.query("SELECT * FROM idea WHERE id = ?", [id]);
  return rows[0];
}

async function insertOne(body, params, creatorId) {
  const { title, description } = body;
  const topicId = params;
  const [result] = await db.query(
    "INSERT INTO idea (title, description, comment_mode_id, creator_id) VALUES (?, ?, ?, ?)",
    [title, description, topicId, creatorId]
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

async function deleteOne(ideaId, userId) {
  const [result] = await db.query(
    "DELETE FROM idea WHERE id = ? AND creator_id = ?",
    [ideaId, userId]
  );

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
