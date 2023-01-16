const { db } = require("./db");

async function getAll() {
  const [rows] = await db.query(
    "SELECT u.id, u.picture, u.email, u.pseudo, u.fullname, u.mood_id, COUNT(ub.badge_id) AS nbr_badges " +
      "FROM user AS u " +
      "INNER JOIN user_badge AS ub ON ub.user_id = u.id " +
      "GROUP BY u.id "
  );

  return rows;
}

async function getOne(id) {
  const [rows] = await db.query(
    "SELECT picture, email, fullname, pseudo, googleUserId FROM user WHERE id = ?",
    [id]
  );
  return rows[0];
}

async function getConnexion(email) {
  const [rows] = await db.query(
    "SELECT picture, email, fullname, pseudo, googleUserId FROM user WHERE email = ?",
    [email]
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
  const { picture, email, fullname, password, googleUserId, moodId } = user;
  const [result] = await db.query(
    "UPDATE user SET picture = ?, email = ?, fullname = ?, password = ?, googleUserId = ?, mood_id= ? WHERE id = ?",
    [picture, email, fullname, password, googleUserId, moodId, id]
  );

  return result.affectedRows;
}

async function deleteOne(id) {
  const [result] = await db.query("DELETE FROM user WHERE id = ?", [id]);

  return result.affectedRows;
}

module.exports = {
  getAll,
  getOne,
  getConnexion,
  insertOne,
  updateOne,
  deleteOne,
};
