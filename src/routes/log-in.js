const { getUserByEmail } = require("../model/user.js");
const { Layout } = require("../templates.js");
const bcrypt = require('bcryptjs');


function get(req, res) {
  const title = "Log in to your account";
  const content = /*html*/ `
    <div class="Cover">
      <h1>${title}</h1>
      <form method="POST" class="Row">
        <div class="Stack" style="--gap: 0.25rem">
          <label for="email">email</label>
          <input type="email" id="email" name="email" required>
        </div>
        <div class="Stack" style="--gap: 0.25rem">
          <label for="password">password</label>
          <input type="password" id="password" name="password" required>
        </div>
        <button class="Button">Log in</button>
      </form>
    </div>
  `;
  const body = Layout({ title, content });
  res.send(body);
}

async function post(req, res) {
  const { email, password } = req.body;
  const user = getUserByEmail(email);
  if (!email || !password || !user) {
    return res.status(400).send("<h1>Login failed</h1>");
  }
  // [1] Compare submitted password to stored hash
  const match = await bcrypt.compare(password, user.hash);
  if (!match) {
    // [2] If no match redirect back to same page so user can retry
    return res.status(400).send("<h1>Login failed</h1>");
  } else {
    // * [3] If match create a session with their user ID,
  const { createSession } = require('../model/session');

  // Create a new session for the user
  const sessionId = createSession(user.id);

  //  set a cookie with the session ID,
  res.cookie('sid', sessionId, { signed: true, httpOnly: true });
  }
   

  // redirect to the user's confession page (e.g. /confessions/3)
  res.redirect(`/confessions/${user.id}`);

   
}

module.exports = { get, post };
