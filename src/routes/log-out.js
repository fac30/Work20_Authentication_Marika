const { removeSession } = require('../model/session'); 

function post(req, res) {
  // [1] Get the session ID from the signed cookie
  const sid = req.signedCookies.sid;

  if (sid) {
    // [2] Remove that session from the DB
    removeSession(sid);

    // [3] Remove the session cookie
    res.clearCookie('sid',{ signed: true, httpOnly: true });
  }

  // [4] Redirect back to the homepage
  res.redirect('/');

}

module.exports = { post };
