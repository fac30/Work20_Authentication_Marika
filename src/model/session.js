const crypto = require('crypto');
const db = require("../database/db.js");

const insert_session = db.prepare(`
   INSERT INTO sessions (id, user_id, expires_at)
  VALUES ($id, $user_id, $expires_at)
`);



function createSession(user_id) {
  // Generate a random session ID
  const sessionId = crypto.randomBytes(18).toString('base64');

  // Calculate the expiration time
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const expiresAtISO = expiresAt.toISOString();


  // Insert the session into the database
  insert_session.run({
    id: sessionId,
    user_id: user_id,
    expires_at: expiresAtISO,
  });

  // Return the session ID
  return sessionId;

}

const select_session = db.prepare(`
  SELECT id, user_id, expires_at
  FROM sessions WHERE id = ?
`);

function getSession(sid) {
  return select_session.get(sid);
}

const delete_session = db.prepare(`
  DELETE FROM sessions WHERE id = ?
`);

function removeSession(sid) {
  return delete_session.run(sid);
}

module.exports = { createSession, getSession, removeSession };
