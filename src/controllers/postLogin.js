let userFetcher = require('../database/user');
let password = require('../models/users/password');

let postLogin = function(req, res) {

  let user = userFetcher.getWithUsername(req.body.username).then(function(data) {

    password.validate(
      req.body.password,
      data.password,
      function isValid() {
        req.session.user = data;
        res.json({
          username: data.username,
          success: true
        });
      },
      function isNotValid() {
        res.json({ success: false });
      }
    );

  }).catch(function(err) {
    res.json({ success: false });
  });
};

module.exports = postLogin;