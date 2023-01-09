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

async function insertOne(user) {
  const { picture, email, fullname, pseudo, password, googleUserId } = user;
  const [result] = await db.query(
    "INSERT INTO user (picture, email, fullname, pseudo, password, googleUserId) VALUES (?, ?, ?, ?, ?, ?)",
    [picture, email, fullname, pseudo, password, googleUserId]
  );
  const [result2] = await db.query(
    "INSERT INTO user_badge (user_id, badge_id) VALUES (?, 1)",
    [result.insertId]
  );

  if (result2.length === 0) {
    return null;
  }
  return result.insertId;
}

async function getOne(id) {
  const [rows] = await db.query("SELECT * FROM user WHERE id = ?", [id]);
  return rows[0];
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
};
