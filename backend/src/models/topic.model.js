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
  const [rows] = await db.query("SELECT * FROM TopicData WHERE id = ?", [id]);

  if (rows[0].id === null) {
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
  await db.query("DELETE FROM user_topic WHERE topic_id = ?", [id]);

  const [ideaId] = await db.query(
    "SELECT id FROM idea WHERE comment_mode_id = ?",
    [id]
  );

  ideaId.forEach(async (idea) => {
    await db.query("UPDATE comment set comment_id = NULL where idea_id = ?", [
      idea.id,
    ]);
    await db.query("DELETE FROM comment WHERE idea_id = ?", [idea.id]);
  });

  await db.query("DELETE FROM bubble WHERE mindmap_id = ?", [id]);
  await db.query("DELETE FROM idea WHERE comment_mode_id = ?", [id]);
  const [result1] = await db.query("DELETE FROM topic WHERE id = ?", [id]);

  if (result1.length === 0) {
    return null;
  }

  return result1.affectedRows;
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
