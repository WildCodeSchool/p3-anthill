const { db } = require("./db");

async function getAll() {
  const [rows] = await db.query("SELECT * FROM idea");

  return rows;
}

async function getAllOfOneTopic(commentModeTopicId) {
  const [rows] = await db.query(
    "SELECT i.id, MIN(i.title) AS idea_title, MIN(i.description) AS idea_description, MIN(i.up_vote) AS nb_up_vote, MIN(u.fullname) AS idea_creator_name, count(c.id) AS nb_comment " +
      "FROM idea AS i " +
      "LEFT JOIN user AS u ON u.id = i.creator_id " +
      "LEFT JOIN comment AS c ON c.idea_id = i.id " +
      "LEFT JOIN comment_mode AS cm ON cm.topic_id = i.comment_mode_id " +
      "WHERE cm.topic_id = ? " +
      "GROUP BY i.id",
    [commentModeTopicId]
  );
  return rows;
}

async function getOne(id) {
  const [rows] = await db.query("SELECT * FROM idea WHERE id = ?", [id]);
  return rows[0];
}

async function insertOne(idea) {
  const { title, description, upVote, commentModeId, creatorId } = idea;
  const [result] = await db.query(
    "INSERT INTO idea (title, description, up_vote, comment_mode_id, creator_id) VALUES (?, ?, ?, ?, ?)",
    [title, description, upVote, commentModeId, creatorId]
  );

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
