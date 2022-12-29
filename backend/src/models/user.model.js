const { db } = require("./db");

async function getAll() {
  const [rows] = await db.query(
    "SELECT * FROM user INNER JOIN (SELECT user_id, count(badge_id) AS nbr_badges FROM user_badge GROUP BY user_badge.user_id) AS ti ON ti.user_id = user.id"
  );

  return rows;
}

async function insertOne(user) {
  const { picture, email, fullname, password, googleUserId } = user;
  const [result] = await db.query(
    "INSERT INTO user (picture, email, fullname, password, googleUserId) VALUES (?, ?, ?, ?, ?)",
    [picture, email, fullname, password, googleUserId]
  );

  return result.insertId;
}

async function getOne(id) {
  const [rows] = await db.query("SELECT * FROM user WHERE id = ?", [id]);
  return rows[0];
}

async function getBadgesForOneUser(id) {
  const [rows] = await db.query(
    "SELECT * FROM user_badge INNER JOIN badge ON badge.id = user_badge.badge_id WHERE user_id = ?",
    [id]
  );
  return rows;
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
  insertOne,
  getOne,
  updateOne,
  deleteOne,
  getBadgesForOneUser,
};
