const { db } = require("./db");

async function getAll() {
  const [rows] = await db.query("SELECT * FROM topic");

  return rows;
}

async function getAllTopicCard() {
  const [rows] = await db.query(
    "SELECT " +
      "t.id AS id, " +
      "t.title AS title, " +
      "u.fullname AS creator_name, " +
      "t.description AS description, " +
      "t.deadline AS deadline, " +
      "count(i.id) AS nb_idea, " +
      "count(b.id) AS nb_bubble, " +
      "cm.topic_id AS comment_mode_topic_id, " +
      "mm.topic_id AS mindmap_mode_topic_id " +
      "FROM topic AS t " +
      "LEFT JOIN comment_mode AS cm ON cm.topic_id = t.id " +
      "LEFT JOIN idea AS i ON i.comment_mode_id = cm.id " +
      "LEFT JOIN mindmap_mode AS mm ON mm.topic_id = t.id " +
      "LEFT JOIN bubble AS b ON b.mindmap_id = mm.id " +
      "LEFT JOIN user AS u ON u.id = t.creator_id " +
      "GROUP BY t.id"
  );
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

async function insertOne(topic) {
  const { deadline, description, title, creatorId } = topic;
  const [result] = await db.query(
    "INSERT INTO topic (deadline, description, title, creator_id) VALUES (?, ?, ?, ?)",
    [deadline, description, title, creatorId]
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
};
