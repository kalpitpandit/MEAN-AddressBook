/**
	@author : Kalpit Pandit
	@email : panditkalpit@gmail.com 
*/

// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

// Schema
var addressSchema = new mongoose.Schema({
	first_name : String,
	last_name : String,
	mobile_phone : Number,
	home_phone : Number,
	email : String,
	address : String
});

// Return model
module.exports = restful.model('Address', addressSchema);