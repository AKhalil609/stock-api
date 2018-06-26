const mongoose = require('mongoose');

// User database schema
mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
	Name: {
		type: String,
		required: true
	},
	personalID: {
		type: String,
		required: true,
		unique: true
	},
	stocks: [{ 
		asset: String, 
		investment: {type:Number, default:0},
		initialStockStauts:{type:Number},
		profit: {type: Number, default: 0}
	}],
	createdAt: { type: Date, default: new Date() }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
