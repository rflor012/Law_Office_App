const express   = require('express');
const paymentRouter= express.Router();
const Case      = require('../models/case');
const User      = require('../models/user');
const Payment   = require('../models/payment');
const bcrypt    = require('bcryptjs');
const passport  = require('passport');

paymentRouter.get('/payments/new', (req, res, next)=>{
  res.render("paymentViews/paymentsIndex");
});

paymentRouter.get('/payments/:id/create', (req, res, next)=>{
  Case.findById(req.params.id)
  .then((theCase)=>{

  res.render('paymentViews/contractSpanish', {theCase: theCase});

  })
  .catch((err)=>{
    next(err);
  });
});


module.exports = paymentRouter;
