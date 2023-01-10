const { db } = require("./db");

async function getAll() {
  const [rows] = await db.query("SELECT * FROM topic");

  return rows;
}

async function getAllTopicCard() {
  const [rows] = await db.query("SELECT * FROM TopicData");
  return rows;
}

async function getOne(id) {
  const [rows] = await db.query(
    "SELECT t.id, t.title, u.fullname AS creator_name, t.description, t.deadline, cm.topic_id AS comment_mode_topic_id " +
      "FROM topic AS t " +
      "LEFT JOIN comment_mode AS cm ON cm.topic_id = t.id " +
      "LEFT JOIN user AS u ON u.id = t.creator_id " +
      "WHERE t.id = ?",
    [id]
  );

  if (rows.length === 0) {
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

async function insertOne(topic) {
  const { deadline, description, title } = topic;
  const [result] = await db.query(
    "INSERT INTO topic (deadline, description, title) VALUES (?, ?, ?)",
    [deadline, description, title]
  );

  if (result.length === 0) {
    return null;
  }

  return result.insertId;
}

async function updateOne(id, topic) {
  const { deadline, description, isPrivate, creatorId, title, isClosed } =
    topic;
  const [result] = await db.query(
    "UPDATE topic SET deadline = ?, description = ?, is_private = ?, creator_id = ?, title = ?, is_closed= ? WHERE id = ?",
    [deadline, description, isPrivate, creatorId, title, isClosed, id]
  );

  if (result.length === 0) {
    return null;
  }

  return result.affectedRows;
}

async function deleteOne(id) {
  const [result] = await db.query("DELETE FROM topic WHERE id = ?", [id]);

  if (result.length === 0) {
    return null;
  }

  return result.affectedRows;
}

module.exports = {
  getAll,
  getAllTopicCard,
  getOne,
  insertOne,
  updateOne,
  deleteOne,
  getAllTopicsOfOneUser,
};
