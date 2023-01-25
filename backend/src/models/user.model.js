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

async function updateOne(id, user) {
  const {
    pseudo,
    email,
    fullname,
    hashedPassword,
    googleUserId,
    moodId,
    picture,
  } = user;
  const [result] = await db.query(
    "UPDATE user SET pseudo = ?, email = ?, fullname = ?, hashedPassword = ?, googleUserId = ?, mood_id= ?, picture = ? WHERE id = ?",
    [pseudo, email, fullname, hashedPassword, googleUserId, moodId, picture, id]
  );

  return result.affectedRows;
}

async function updateOneAudrey(id, user) {
  const { pseudo, email, picture } = user;
  const [result] = await db.query(
    "UPDATE user SET pseudo = ?, email = ?, picture = ? WHERE id = ?",
    [pseudo, email, picture, id]
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
  updateOneAudrey,
  deleteOne,
};
