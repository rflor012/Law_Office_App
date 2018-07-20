const express   = require('express');
const caseRouter= express.Router();
const Case      = require('../models/case');
const Payment   = require('../models/payment');
const Contract  = require('../models/contract');
const User      = require('../models/user');
const bcrypt    = require('bcryptjs');
const passport  = require('passport');

caseRouter.get('/create/client', (req, res, next)=>{
  res.render('caseViews/createClient');
});

caseRouter.post('/create/client', (req, res, next) => {
  const theName       = req.body.theName;
  const theLastName   = req.body.theLastName;
  const theDOB        = req.body.theDOB;
  const theCaseNumber = req.body.theCaseNumber;
  const theCaseType = req.body.theCaseType;
  const thePhoneNumber = req.body.thePhoneNumber;
  const theAddress = req.body.theAddress;

  if (theName === "" || theLastName === "" || theDOB === "" || theCaseNumber === "" || theCaseType === "" || thePhoneNumber === "" || theAddress === "") {
    res.render('caseViews/createClient', {errorMessage: 'Please fill in all fields'});
    return;
  }
  Case.findOne({'caseNumber': theCaseNumber})
  .then((response)=>{
    if (response !== null){
      res.render('caseViews/createClient', {errorMessage: `Duplicate case number encountered: ${theCaseNumber}`});
      return;
    }
  Case.create({name: theName, lastName: theLastName, dateOfBirth: theDOB, caseNumber: theCaseNumber, caseType: theCaseType, phoneNumber: thePhoneNumber, address: theAddress})
  .then((response)=>{
    res.redirect('/client/all');
  })
  .catch((errorMessage)=>{
    next(errorMessage);
  });

  });
});

caseRouter.get('/client/all', (req, res, next) => {
  Case.find()
  .populate('payment')
  .then((allTheCases)=>{

  res.render('caseViews/viewCases', {allTheCases});
  })
  .catch((err)=>{
    next(err);
  });
});


//route to edit a client. This can be clicked on in the View Cases view.
caseRouter.get('/client/:id/edit', (req, res, next)=>{
  //looking into the case model to pull a case via obj. ID
  Case.findById(req.params.id)
  .then((theCase)=>{
    // console.log("==================== ID", req.params.id);
    console.log("====================", theCase);
    res.render('caseViews/editClient', {theCase: theCase});
  })
  .catch((err)=>{
    next(err);
  });
});

caseRouter.post('/client/:id/update', (req, res, next)=>{
  Case.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    lastName: req.body.lastName,
    dateOfBirth: req.body.dateOfBirth,
    caseNumber: req.body.caseNumber,
    caseType: req.body.caseType,
    phoneNumber: req.body.phoneNumber,
    address: req.body.address,
    //need to include the payment portion here when I have that figured out
  })
  .then((theCase)=>{
    res.redirect('/client/all');
  })
  .catch((err)=>{
    next(err);
  });
});

caseRouter.post('/client/:id/delete', (req, res, next)=>{
  Case.findByIdAndRemove(req.params.id)
  .then((response)=>{
    res.redirect('/client/all');
  })
  .catch((err)=>{
    next(err);
  });
});




module.exports = caseRouter;
