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
    "SELECT t.id, t.is_comment_mode, t.title, u.fullname AS creator_name, t.description, t.deadline, count(i.id) AS nb_idea, count(b.id) AS nb_bubble " +
      "FROM topic AS t " +
      "LEFT JOIN user AS u ON u.id = t.creator_id " +
      "LEFT JOIN idea AS i ON i.comment_mode_id = t.id " +
      "LEFT JOIN bubble AS b ON b.mindmap_id = t.id " +
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
  const { deadline, description, title, creatorId, isCommentMode } = topic;
  const [result] = await db.query(
    "INSERT INTO topic (deadline, description, title, creator_id, is_comment_mode) VALUES (?, ?, ?, ?, ?)",
    [deadline, description, title, creatorId, isCommentMode]
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
