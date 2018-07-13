const express = require('express');
const router  = express.Router();

router.get('/', (req, res, next) => {
  res.render('index', {theUser: req.user});
});


module.exports = router;
