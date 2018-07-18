const express   = require('express');
const paymentRouter= express.Router();
const Case      = require('../models/case');
const User      = require('../models/user');
const Payment   = require('../models/payment');
const bcrypt    = require('bcryptjs');
const passport  = require('passport');


paymentRouter.get('/payments/all', (req, res, next)=>{
  res.render("paymentViews/paymentsIndex");
});

paymentRouter.get('/payments/:id/create', (req, res, next)=>{
  Case.findById(req.params.id)
  .then((theCase)=>{

    res.render('paymentViews/createPayment');
  })
  .catch((err)=>{
    next(err);
  });
});

paymentRouter.post('/payments/:id/create', (req, res, next)=>{
  const theDate           = req.body.theDate;
  const theTotalRetainer  = req.body.theTotalRetainer;
  const theTotalPayments  = req.body.theTotalPayments;
  const nextPaymentDates  = req.body.nextPayDates;
  const nextPaymentAmount = req.body.nextPayAmount;
  const theInitialPayment = req.body.theInitialPayment;
  const theBalance        = req.body.theBalance;

  if (theDate === "" || theTotalRetainer === "" || theTotalPayments === "" || nextPaymentDates === "" || nextPaymentAmount === "" || theInitialPayment === ""){
    res.render('paymentViews/createPayment', {errorMessage: "Please fill in all fields"});
    return;
  }

  Payment.create({beginDate: theDate, totalRetainer: theTotalRetainer, totalPayments: theTotalPayments, nextPaymentDates: nextPaymentDates, nextPaymentAmount: nextPaymentAmount, initialPayment: theInitialPayment})
  .then((response)=>{
    res.redirect('/client/all');
  })
  .catch((errorMessage)=>{
    next(errorMessage);
  });
});

paymentRouter.get('/payments/:id/create/contract', (req, res, next)=>{
  Case.findById(req.params.id)
  .then((theCase)=>{

  res.render('paymentViews/contractSpanish', {theCase: theCase});

  })
  .catch((err)=>{
    next(err);
  });
});


module.exports = paymentRouter;
