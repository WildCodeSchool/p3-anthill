const { db } = require("./db");

async function getAll() {
  const [rows] = await db.query(
    "SELECT u.id, u.picture, u.pseudo, u.fullname, u.mood_id, COUNT(ub.badge_id) AS nbr_badges " +
      "FROM user AS u " +
      "INNER JOIN user_badge AS ub ON ub.user_id = u.id " +
      "GROUP BY u.id "
  );

  return rows;
}

async function getOne(id) {
  const [rows] = await db.query(
    "SELECT id, picture, email, pseudo, description, mood_id FROM user WHERE id = ?",
    [id]
  );
  return rows[0];
}

async function insertOne(user) {
  const { picture, email, fullname, pseudo, password, googleUserId } = user;
  const [result] = await db.query(
    "INSERT INTO user (picture, email, fullname, pseudo, password, googleUserId) VALUES (?, ?, ?, ?, ?, ?)",
    [picture, email, fullname, pseudo, password, googleUserId]
  );

  return result.insertId;
}

async function updateOne(id, user) {
  const { pseudo } = user;
  const [result] = await db.query("UPDATE user SET pseudo = ? WHERE id = ?", [
    pseudo,
    id,
  ]);

  return result.affectedRows;
}

async function deleteOne(id) {
  const [result] = await db.query("DELETE FROM user WHERE id = ?", [id]);

  return result.affectedRows;
}

module.exports = {
  getAll,
  insertOne,
  getOne,
  updateOne,
  deleteOne,
};
