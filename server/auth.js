const md5 = require('md5');
const db = require('./db.js');

let obj = {};

obj.auth = (req, cb) => {
  let auth = req.get('advanced-auth');
  if(!auth){
    cb(false);
    return false;
  }
  let username = auth.split(':')[0];
  let token = auth.split(':')[1];
  let allow = false;

  db.postgre.query("SELECT * FROM admin_users WHERE username = $1", [username], (err, result) => {
      if (result.rows[0] && md5(result.rows[0].username + result.rows[0].pasw) == token) {
          allow = true;
      }
      cb(allow);
  });
}

module.exports = obj;
