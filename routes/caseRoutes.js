const express   = require('express');
const caseRouter= express.Router();
const User      = require('../models/user');
const bcrypt    = require('bcryptjs');
const passport  = require('passport');

module.exports = caseRouter;
