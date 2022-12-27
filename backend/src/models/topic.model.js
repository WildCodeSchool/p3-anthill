const { db } = require("./db");

async function getAll() {
  const [rows] = await db.query("SELECT * FROM topic");

  return rows;
}

async function getAllTopicCard() {
  const [rows] = await db.query(
    "SELECT t.title, MIN(u.fullname) AS creator_name, MIN(t.description) AS description, MIN(t.deadline) AS deadline, count(i.id) AS nb_idee, MIN(cm.topic_id) AS comment_mode_topic_id, MIN(mm.topic_id) AS mindmap_mode_topic_id " +
      "FROM idea AS i " +
      "RIGHT JOIN comment_mode AS cm ON cm.id = i.comment_mode_id " +
      "RIGHT JOIN topic AS t ON t.id = cm.topic_id " +
      "LEFT JOIN mindmap_mode AS mm ON mm.topic_id = t.id " +
      "JOIN user AS u ON u.id = t.creator_id " +
      "GROUP BY t.title"
  );
  return rows;
}

async function getOne(id) {
  const [rows] = await db.query("SELECT * FROM topic WHERE id = ?", [id]);
  return rows[0];
}

async function getOneTopicDetail(id) {
  const [rows] = await db.query(
    "SELECT t.title, u.fullname AS creator_name, t.description, t.deadline, cm.topic_id AS comment_mode_topic_id " +
      "FROM topic AS t " +
      "LEFT JOIN comment_mode AS cm ON cm.topic_id = t.id " +
      "LEFT JOIN user AS u ON u.id = t.creator_id " +
      "WHERE t.id = ?",
    [id]
  );
  return rows[0];
}

async function insertOne(topic) {
  const { deadline, description, isPrivate, creatorId, title, isClosed } =
    topic;
  const [result] = await db.query(
    "INSERT INTO topic (deadline, description, is_private, creator_id, title, is_closed) VALUES (?, ?, ?, ?, ?, ?)",
    [deadline, description, isPrivate, creatorId, title, isClosed]
  );

  return result.insertId;
}

async function updateOne(id, topic) {
  const { deadline, description, isPrivate, creatorId, title, isClosed } =
    topic;
  const [result] = await db.query(
    "UPDATE topic SET deadline = ?, description = ?, is_private = ?, creator_id = ?, title = ?, is_closed= ? WHERE id = ?",
    [deadline, description, isPrivate, creatorId, title, isClosed, id]
  );

  return result.affectedRows;
}

async function deleteOne(id) {
  const [result] = await db.query("DELETE FROM topic WHERE id = ?", [id]);

  return result.affectedRows;
}

module.exports = {
  getAll,
  getAllTopicCard,
  getOne,
  getOneTopicDetail,
  insertOne,
  updateOne,
  deleteOne,
};
