const express   = require('express');
const userRouter= express.Router();
const User      = require('../models/user');
const bcrypt    = require('bcryptjs');
const passport  = require('passport');

userRouter.get('/signup', (req, res, next)=>{
  res.render('userViews/signupPage');
});

userRouter.post('/signup', (req, res, next)=>{
  const thePassword = req.body.thePassword;
  const theUsername = req.body.theUsername;
  const theEmail    = req.body.theEmail;
  const theRole     = req.body.theRole;

  if(thePassword ==="" || theUsername ===""){
    res.render('userViews/signupPage', {errorMessage: 'Please input a username or password to create an account'});
    return;
  }
  User.findOne({'username': theUsername})
  .then((response)=>{
    if (response !== null){
      res.render('userViews/signupPage', {errorMessage: `Sorry username ${theUsername} is already taken`});
      return;
    }
    const salt  = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(thePassword, salt);
    User.create({username: theUsername, password: hashedPassword, email: theEmail, role: theRole})
    .then((response)=>{
      res.redirect('/');
    })
    .catch((errorMessage)=>{
      next(errorMessage);
    });
  });
});


userRouter.get('/login', (req, res, next)=>{
  res.render('userViews/loginPage');
});

userRouter.get('/login', (req, res, next)=>{
  res.render('userViews/loginPage', {errorMessage: req.flash("errorMessage")});
});

userRouter.post("/login", passport.authenticate('local', {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallBack: true
}));

userRouter.get('/logout', (req, res, next) =>{
  req.logout();
  res.redirect('/login');
});


module.exports = userRouter;
