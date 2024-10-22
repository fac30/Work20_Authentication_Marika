const { Layout } = require("../templates.js");
const { getSession } = require("../model/session");

function get(req, res) {
    // [1] Read session ID from signed cookie
    const sid = req.signedCookies.sid;
    let content;
  
    if (sid) {
      // [2] Get session from DB
      const session = getSession(sid);
  
      // [3] If the session exists, render a log out form
      if (session) {
        content = `
          <div class="Cover">
            <h1>Welcome back!</h1>
            <form method="POST" action="/log-out">
              <button class="Button">Log out</button>
            </form>
          </div>
        `;
      } else {
        // If no session, show login/signup links
        content = `
          <div class="Cover">
            <h1>Confess your secrets!</h1>
            <nav><a href="/sign-up">Sign up</a> or <a href="/log-in">log in</a></nav>
          </div>
        `;
      }
    } else {
      // [5] If no session ID, show login/signup links
      content = `
        <div class="Cover">
          <h1>Confess your secrets!</h1>
          <nav><a href="/sign-up">Sign up</a> or <a href="/log-in">log in</a></nav>
        </div>
      `;
    }
   
  const title = "Confess your secrets!";`
    <div class="Cover">
      <h1>${title}</h1>
      <nav><a href="/sign-up">Sign up</a> or <a href="/log-in">log in</a></nav>
    </div>
  `;
  const body = Layout({ title, content });
  res.send(body);
}

module.exports = { get };
