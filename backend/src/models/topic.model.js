const { db } = require("./db");

async function getAll() {
  const [rows] = await db.query("SELECT * FROM topic");

  return rows;
}

async function getAllTopicCard() {
  const [rows] = await db.query("SELECT * FROM TopicData");
  return rows;
}

async function getTrendingTopicsByIdeasCount() {
  const [rows] = await db.query(
    "SELECT * FROM TopicData ORDER BY nb_idea desc"
  );
  return rows;
}

async function getOne(id) {
  const [rows] = await db.query("SELECT * FROM TopicData WHERE id = ?", [id]);

  if (!rows[0] || rows[0].id === null) {
    return null;
  }

  return rows[0];
}

async function getAllTopicsOfOneUser(userId) {
  const [rows] = await db.query(
    "SELECT * FROM TopicData WHERE creator_id = ?",
    [userId]
  );
  return rows;
}

async function insertOne(topic, creatorId) {
  const { deadline, description, title, isCommentMode } = topic;
  const [result] = await db.query(
    "INSERT INTO topic (deadline, description, title, creator_id, is_comment_mode) VALUES (?, ?, ?, ?, ?)",
    [deadline, description, title, creatorId, isCommentMode]
  );

  if (result.length === 0) {
    return null;
  }

  return result.insertId;
}

async function updateOne(id, slackWorkingPlaceId, slackChannel, topic) {
  const { deadline, description, isPrivate, creatorId, title, isClosed } =
    topic;
  const [result] = await db.query(
    "UPDATE topic SET deadline = ?, description = ?, is_private = ?, creator_id = ?, title = ?, is_closed= ?, slack_working_place_id = ?, slack_channel = ? WHERE id = ?",
    [
      deadline,
      description,
      isPrivate,
      creatorId,
      title,
      isClosed,
      slackWorkingPlaceId,
      slackChannel,
      id,
    ]
  );

  if (result.length === 0) {
    return null;
  }

  return result.affectedRows;
}

async function updateOnlySlackInfos(id, slackChannelLink) {
  const [result] = await db.query(
    "UPDATE topic SET slack_channel_link = ? WHERE id = ?",
    [slackChannelLink, id]
  );

  if (result.length === 0) {
    return null;
  }

  return result.affectedRows;
}

async function deleteOne(topicId, userId) {
  const [result1] = await db.query(
    "DELETE FROM topic WHERE id = ? AND creator_id = ?",
    [topicId, userId]
  );

  if (result1.length === 0) {
    return null;
  }

  return result1.affectedRows;
}

module.exports = {
  getAll,
  getAllTopicCard,
  getTrendingTopicsByIdeasCount,
  getOne,
  insertOne,
  updateOne,
  deleteOne,
  getAllTopicsOfOneUser,
  updateOnlySlackInfos,
};
