/**
	@author : Kalpit Pandit
	@email : panditkalpit@gmail.com 
*/

// Dependencies
var express = require('express');
var router = express.Router();

// Models
var Address = require('../models/address');

// Routes
Address.methods(['get','put','post']);
Address.register(router, '/address');

// Return router
module.exports = router;