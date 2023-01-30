const { db } = require("./db");

async function getAll() {
  const [rows] = await db.query("SELECT * FROM BubbleData");

  return rows;
}

async function getAllBubblesByTopicId(topicId) {
  const [rows] = await db.query(
    "SELECT * FROM BubbleData WHERE mindmap_id = ? ",
    [topicId]
  );
  return rows;
}

async function getOneBubbleById(bubbleId) {
  const [rows] = await db.query("SELECT * FROM BubbleData WHERE id = ?", [
    bubbleId,
  ]);
  return rows[0];
}

async function insertOne(mindmapId, userId, content) {
  const [result] = await db.query(
    "INSERT INTO bubble (mindmap_id, creator_id, content) VALUES (?, ?, ?)",
    [mindmapId, userId, content]
  );

  if (!result.insertId) {
    return null;
  }

  return result.insertId;
}

async function updateOne({ bubbleId, userId, content }) {
  const [result] = await db.query(
    "UPDATE bubble SET content = ? WHERE id = ? AND creator_id = ?",
    [content, bubbleId, userId]
  );

  return result.affectedRows;
}

async function deleteOne({ bubbleId, userId }) {
  const [result] = await db.query(
    "DELETE FROM bubble WHERE id = ? AND creator_id = ?",
    [bubbleId, userId]
  );

  return result.affectedRows;
}

module.exports = {
  getAll,
  getAllBubblesByTopicId,
  getOneBubbleById,
  insertOne,
  updateOne,
  deleteOne,
};
