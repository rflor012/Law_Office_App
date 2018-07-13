const express   = require('express');
const paymentRouter= express.Router();
const User      = require('../models/user');
const bcrypt    = require('bcryptjs');
const passport  = require('passport');

module.exports = paymentRouter;
