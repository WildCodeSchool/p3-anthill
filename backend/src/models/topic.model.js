const { db } = require("./db");

async function getAll() {
  const [rows] = await db.query("SELECT * FROM topic");

  return rows;
}

async function getAllTopicCard() {
  const [rows] = await db.query(
    "select t.title, min(u.fullname) as creator_name, min(t.description) as description, min(t.deadline) as deadline, count(i.id) as nb_idee from idea as i right join comment_mode as cm on cm.id = i.comment_mode_id right join topic as t on t.id = cm.topic_id left join user as u on u.id = t.creator_id group by t.title"
  );
  return rows;
}

async function getOne(id) {
  const [rows] = await db.query("SELECT * FROM topic WHERE id = ?", [id]);
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
  insertOne,
  updateOne,
  deleteOne,
};
