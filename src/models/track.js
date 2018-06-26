const mongoose = require('mongoose');

// Stock database schema
mongoose.Promise = global.Promise;

const stockSchema = new mongoose.Schema({
	companyName: {
		type: String,
		required: true,
		unique: true
	},
	symbol: {
		type: String,
		required: true,
		unique: true
	},
	stockPrice: {
		type: Number
	},
	stockStatus: {
		type: Number
	},
	createdAt: { type: Date, default: new Date() }
});

const Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock;
