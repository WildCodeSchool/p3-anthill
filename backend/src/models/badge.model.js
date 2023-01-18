const { db } = require("./db");

async function getAll() {
  const [rows] = await db.query("SELECT * FROM badge");

  return rows;
}

async function insertOne(badge) {
  const { name, path } = badge;
  const [result] = await db.query(
    "INSERT INTO badge (name, path) VALUES (?, ?)",
    [name, path]
  );

  return result.insertId;
}

async function getOne(id) {
  const [rows] = await db.query("SELECT * FROM badge WHERE id = ?", [id]);
  return rows[0];
}

async function updateOne(id, badge) {
  const { name, path } = badge;
  const [result] = await db.query(
    "UPDATE badge SET name = ?, path = ? WHERE id = ?",
    [name, path, id]
  );

  return result.affectedRows;
}

async function deleteOne(id) {
  const [result] = await db.query("DELETE FROM badge WHERE id = ?", [id]);

  return result.affectedRows;
}

async function getUserBadges(id) {
  const [rows] = await db.query(
    "SELECT user_id, badge_id, name, path " +
      "FROM user_badge as ub " +
      "INNER JOIN badge as b on ub.badge_id=b.id " +
      "WHERE ub.user_id = ?",
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
