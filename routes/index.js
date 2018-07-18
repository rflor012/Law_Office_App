const express = require('express');
const router  = express.Router();

router.get('/', (req, res, next) => {
  console.log("current user ========================================= ", req.user);
  res.render('index', {theUser: req.user});
});


module.exports = router;
