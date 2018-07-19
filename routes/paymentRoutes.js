const express       = require('express');
const paymentRouter = express.Router();
const Case          = require('../models/case');
const User          = require('../models/user');
const Payment       = require('../models/payment');
const Contract      = require('../models/contract');
const bcrypt        = require('bcryptjs');
const passport      = require('passport');



paymentRouter.get('/payments/:id/create', (req, res, next)=>{
  Case.findById(req.params.id)
  .then((theCase)=>{
    res.render('paymentViews/createPayment', {theCase});
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
  .then((createdPayment)=>{
    Case.findByIdAndUpdate(req.params.id, {payment: createdPayment._id})
    .then(()=>{
      res.redirect('/client/all');
    })
    .catch((errorMessage)=>{
      next(errorMessage);
    });
  })
  .catch((errorMessage)=>{
    next(errorMessage);
  });

});


paymentRouter.get('/payments/:id/view/paymentDetails', (req, res, next)=>{
  Case.findById(req.params.id)
  .populate('payment')
  .then((theCase)=>{
    res.render('paymentViews/paymentDetails', {theCase: theCase});
  })
  .catch((err)=>{
    next(err);
  });
});
//router get for edit
paymentRouter.get('/payments/:id/edit', (req, res, next)=>{
  Case.findById(req.params.id)
  .populate('payment')
  .then((theCase)=>{
    res.render('paymentViews/paymentEdit', {theCase});
  })
  .catch((err)=>{
    next(err);
  });
});
//router post for edit updates
paymentRouter.post('/payments/:id/update', (req, res, next)=>{
  Payment.findByIdAndUpdate(req.params.id, {
    beginDate: req.body.beginDate,
    totalRetainer: req.body.totalRetainer,
    initialPayment: req.body.initialPayment,
    totalPayments: req.body.totalPayments,
    nextPaymentDates: req.body.nextPaymentDates,
    nextPaymentAmount: req.body.nextPaymentAmount
  })
  .then((thePayment)=>{
    res.redirect('/paymentViews/paymentDetail');
  })
  .catch((err)=>{
      next(err);
  });
});
//having issues here with updating the DB entries.


paymentRouter.get('/payments/:id/create/contract', (req, res, next)=>{
  Case.findById(req.params.id)
  .populate('payment')
  // .populate('contract')
  .then((theCase)=>{

  res.render('paymentViews/contractSpanish', {theCase});

  })
  .catch((err)=>{
    next(err);
  });
});
//The above route is going to populate the contract with values from theCase and ref's to Payment model. Hence populate.

//The bottom is supposed to grab this contract with the populated fields and add to a collection......

paymentRouter.post('/payments/updatedContract', (req, res, next)=>{
  const theContract ={};

  theContract.contract = req.body.theContract;
  theContract.caseID   = req.body.theCaseID;


  Contract.create(theContract)
  .then((createdContract)=>{
    res.json(createdContract);
  })
  .catch((errorMessage)=>{
    next(errorMessage);
  });
});
//have the words stored somewhere on the server,

paymentRouter.get('/payments/:id/view/contract',(req, res, next)=>{
    Case.findById(req.params.id)
    .populate('contract')
    .then((theCase)=>{
      console.log("///////////////////////////////////////", theCase);
      res.render('paymentViews/contractDetails', {theCase: theCase});
    })
    .catch((err)=>{
      next(err);
    });
  });

// need help displaying the contracts on the page now.

paymentRouter.get('/payments/all', (req, res, next)=>{
  res.render("paymentViews/paymentsIndex");
});

module.exports = paymentRouter;
