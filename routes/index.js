const express = require('express');
const router  = express.Router();
const ensureLogin = require('connect-ensure-login');

router.get('/', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  console.log("current user ========================================= ", req.user);
  res.render('index', {theUser: req.user});
});


module.exports = router;
