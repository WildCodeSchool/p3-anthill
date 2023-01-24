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
  if (!rows[0]) {
    return null;
  }

  return rows[0];
}

async function getConnexion(email) {
  const [rows] = await db.query("SELECT id FROM user WHERE email = ?", [email]);
  if (!rows[0]) {
    return null;
  }

  return rows[0];
}

async function insertOne(user) {
  const { picture, email, fullname, pseudo, hashedPassword, googleUserId } =
    user;
  const [result] = await db.query(
    "INSERT INTO user (picture, email, fullname, pseudo, hashedPassword, googleUserId) VALUES (?, ?, ?, ?, ?, ?)",
    [picture, email, fullname, pseudo, hashedPassword, googleUserId]
  );

  return result.insertId;
}

async function getCurrentUser(currentUserId) {
  const [rows] = await db.query(
    "SELECT u.id, u.picture, u.email, u.pseudo, u.fullname, u.mood_id " +
      "FROM user AS u " +
      "WHERE u.id = ? ",
    [currentUserId]
  );
  if (!rows[0]) {
    return null;
  }

  return rows[0];
}

async function updateOne(id, user) {
  const { pseudo, email, fullname, hashedPassword, googleUserId, moodId } =
    user;
  const [result] = await db.query(
    "UPDATE user SET pseudo = ?, email = ?, fullname = ?, hashedPassword = ?, googleUserId = ?, mood_id= ? WHERE id = ?",
    [pseudo, email, fullname, hashedPassword, googleUserId, moodId, id]
  );

  return result.affectedRows;
}

async function updateOneAudrey(id, user) {
  const { pseudo, email } = user;
  const [result] = await db.query(
    "UPDATE user SET pseudo = ?, email = ? WHERE id = ?",
    [pseudo, email, id]
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
  getCurrentUser,
  updateOne,
  updateOneAudrey,
  deleteOne,
};
