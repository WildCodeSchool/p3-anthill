const { db } = require("./db");

async function getAllUpvotesOfUser(userId) {
  const [rows] = await db.query(
    "SELECT idea_id FROM upvote_idea_user where user_id = ?",
    [userId]
  );

  if (rows.length === 0) {
    return null;
  }

  return rows;
}

async function getAllUpvotesCommentOfUser(userId) {
  const [rows] = await db.query(
    "SELECT comment_id FROM upvote_comment_user where user_id = ?",
    [userId]
  );

  if (rows.length === 0) {
    return null;
  }

  return rows;
}

async function insertOneForIdea({ ideaId, userId }) {
  const [result] = await db.query(
    "INSERT IGNORE INTO upvote_idea_user (user_id, idea_id) VALUES (?, ?)",
    [userId, ideaId]
  );

  if (result.length === 0) {
    return null;
  }

  return result.affectedRows;
}

async function insertOneForComment({ commentId, userId }) {
  const [result] = await db.query(
    "INSERT IGNORE INTO upvote_comment_user (user_id, comment_id) VALUES (?, ?)",
    [userId, commentId]
  );

  if (result.length === 0) {
    return null;
  }

  return result.affectedRows;
}

async function updateOneForIdea(ideaId, userId) {
  const [result] = await db.query(
    "DELETE FROM upvote_idea_user WHERE idea_id = ? AND user_id = ?",
    [ideaId, userId]
  );

  if (result.length === 0) {
    return null;
  }

  return result.affectedRows;
}

async function updateOneForComment(commentId, userId) {
  const [result] = await db.query(
    "DELETE FROM upvote_comment_user WHERE comment_id = ? AND user_id = ?",
    [commentId, userId]
  );

  if (result.length === 0) {
    return null;
  }

  return result.affectedRows;
}

module.exports = {
  getAllUpvotesOfUser,
  getAllUpvotesCommentOfUser,
  insertOneForIdea,
  insertOneForComment,
  updateOneForIdea,
  updateOneForComment,
};
