const { db } = require("./db");

async function getAll() {
  const [rows] = await db.query("SELECT * FROM badge");

  return rows;
}

async function insertOne(badge) {
  const { name, picture } = badge;
  const [result] = await db.query(
    "INSERT INTO badge (name, picture) VALUES (?, ?)",
    [name, picture]
  );

  return result.insertId;
}

async function getOne(id) {
  const [rows] = await db.query("SELECT * FROM badge WHERE id = ?", [id]);
  return rows[0];
}

async function updateOne(id, badge) {
  const { name, picture } = badge;
  const [result] = await db.query(
    "UPDATE badge SET name = ?, picture = ? WHERE id = ?",
    [name, picture, id]
  );

  return result.affectedRows;
}

async function deleteOne(id) {
  const [result] = await db.query("DELETE FROM badge WHERE id = ?", [id]);

  return result.affectedRows;
}

async function getUserBadges(id) {
  const [rows] = await db.query(
    "SELECT * FROM badge AS b " +
      "INNER JOIN user_badge AS us ON user_badge.badge_id = badge.id " +
      "WHERE user_id = ?",
    [id]
  );
  return rows;
}

module.exports = {
  getAll,
  insertOne,
  getOne,
  updateOne,
  deleteOne,
  getUserBadges,
};
