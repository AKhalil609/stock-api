const express = require('express');
const { errResponse } = require('../../services/errors');
const User = require('./User.Service');
const bodyParser = require('body-parser');



const app = express();
app.use(bodyParser.json());

module.exports = {
	addUser: (req, res, next) => {
		var reg = req.body;

		var instance = new User({
			Name: reg.Name,
			personalID: reg.personalID,
			stocks: reg.stocks
		});
		return instance
			.add(instance)
			.then(data => {
				return res.send(data);
			})
			.catch(() => next(errResponse('Error', 403)));
	},

	getAllUsers: (req, res, next) => {
		const instance = new User();
		return instance
			.getAll()
			.then(data => {
				if (data.length === 0) {
					return res.status(200).send({ message: 'Collection empty!' });
				}
				return res.send(data);
			})
			.catch(() => next(errResponse('Error', 403)));
	},

	getOneUser: (req, res, next) => {
		const instance = new User();
		var personalID = req.params.personalID;

		return instance
			.getOne(personalID)
			.then(data => {
				if (data.length === 0) {
					return res.status(200).send({ message: 'Collection empty!' });
				}
				return res.send(data);
			})
			.catch(() => next(errResponse('Error', 403)));
	},

	addInvestment: (req, res, next) => {
		const instance = new User();
		var personalID = req.params.personalID;
		var info = req.body;
		var rData;
		return instance
			.invest(personalID, info)
			.then(data => {
				rData = data;
				if (data.length === 0) {
					return res.status(200).send({ message: 'Collection empty!' });
				}
				return res.send(data);
			})
			.catch(() => {
				if (rData === null) {
					instance
						.newInvest(personalID, info)
						.then(data => {
							return res.send(data);
						})
						.catch(() => next(errResponse('Cannot get all cache', 403)));
				}else{
					next(errResponse('Error', 403));
				}
			});
	},

	getProfit: (req, res, next) => {
		const instance = new User();
		var personalID = req.params.personalID;
		return instance
			.getProfit(personalID)
			.then(data => {
				if (data.length === 0) {
					return res.status(200).send({ message: 'Collection empty!' });
				}
				return res.send(data);
			})
			.catch(() => next(errResponse('Error', 403)));
	}
};