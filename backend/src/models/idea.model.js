const { db } = require("./db");

async function getAll() {
  const [rows] = await db.query("SELECT * FROM idea");

  return rows;
}

async function getAllOfOneTopic(commentModeTopicId) {
  const [rows] = await db.query(
    "SELECT i.id, MIN(i.title) AS idea_title, MIN(i.description) AS idea_description, MIN(i.up_vote) AS nb_up_vote, MIN(u.fullname) AS idea_creator_name, count(c.id) AS nb_comment " +
      "FROM idea AS i " +
      "LEFT JOIN topic AS t ON t.id = i.comment_mode_id " +
      "LEFT JOIN user AS u ON u.id = i.creator_id " +
      "LEFT JOIN comment AS c ON c.idea_id = i.id " +
      "WHERE i.comment_mode_id = ? " +
      "GROUP BY i.id",
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
  await db.query("UPDATE comment SET comment_id = NULL where idea_id = ?", [
    id,
  ]);
  await db.query("DELETE FROM comment WHERE idea_id = ?", [id]);

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
