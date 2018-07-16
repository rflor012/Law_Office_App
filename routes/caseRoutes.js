const express   = require('express');
const caseRouter= express.Router();
const User      = require('../models/user');
const bcrypt    = require('bcryptjs');
const passport  = require('passport');
const ensureLogin = require('connect-ensure-login');

caseRouter.get('/create/client', ensureLogin.ensureLoggedIn(), (req, res, next)=>{
  if(!req.session.currentUser){
    res.redirect('/login');
    return;
  }
  res.render('userViews/createClient');
});


module.exports = caseRouter;
