const express   = require('express');
const caseRouter= express.Router();
const Case      = require('../models/case');
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
  const theClientID = req.body.theClientID;
  const thePhoneNumber = req.body.thePhoneNumber;
  const theAddress = req.body.theAddress;

  if (theName === "" || theLastName === "" || theDOB === "" || theCaseNumber === "" || theCaseType === "" || theClientID === "" || thePhoneNumber === "" || theAddress === "") {
    res.render('caseViews/createClient', {errorMessage: 'Please fill in all fields'});
    return;
  }
  Case.findOne({'caseNumber': theCaseNumber})
  .then((response)=>{
    if (response !== null){
      res.render('caseViews/createClient', {errorMessage: `Duplicate case number encountered: ${theCaseNumber}`});
      return;
    }
  Case.create({name: theName, lastName: theLastName, dateOfBirth: theDOB, caseNumber: theCaseNumber, caseType: theCaseType, clientID: theClientID, phoneNumber: thePhoneNumber, address: theAddress})
  .then((response)=>{
    res.redirect('/create/client');
  })
  .catch((errorMessage)=>{
    next(errorMessage);
  });

  });
});

caseRouter.get('/client/all', (req, res, next) => {
  Case.find()
  .then((allTheCases)=>{
  res.render('caseViews/viewCases', {allTheCases});
  })
  .catch((err)=>{
    next(err);
  });
});

module.exports = caseRouter;
