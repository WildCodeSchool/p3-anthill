const { db } = require("./db");

async function getUserByEmailWithPassword(email) {
  const [rows] = await db.query("SELECT * FROM user WHERE email = ?", [email]);

  if (!rows[0]) {
    return null;
  }
  return rows[0];
}

module.exports = {
  getUserByEmailWithPassword,
};
