const Stock = require('./Stock.Service');
const { errResponse } = require('../../services/errors');
const iexTrading = require('../../services/iexTrading');

module.exports = {
	// Adds new stock to DB
	addOne: (req, res, next) => {
		var symbol = req.params.symbol;

		iexTrading.getStock(symbol, (err, results) => {
			if (err) {
				return res.status(404).send({ message: 'Unable to fetch Stock' });
			} else {
				var instance = new Stock({
					companyName: results.companyName,
					symbol: results.symbol,
					stockPrice: results.stockPrice,
					stockStatus: results.stockStatus
				});
				return instance
					.addOne(instance)
					.then(data => {
						if (data.length === 0) {
							return res.status(200).send({ message: 'Collection empty!' });
						}
						return res.send(data);
					})
					.catch(() => next(errResponse('Error', 403)));
			}
		});
	},

	// retrives all stock data
	getAllData: (req, res, next) => {
		const instance = new Stock();
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

	// Checks updates the stocks in the DB
	updateStock: (req, res, next) => {
		const instance = new Stock();


		return instance
			.updateAll()
			.then(data => {

				if (data === undefined) {
					return res.status(200).send({ message: ' updated' });
				}
				return res.send(data);
			})
			.catch((e) => next(errResponse(e, 403)));
	},

	// retrives a single stock
	getStock: (req, res, next) => {
		const instance = new Stock();
		var symbol = req.params.symbol;

		return instance
			.getOne(symbol)
			.then(data => {
				if (data.length === 0) {
					return res.status(200).send({ message: 'Collection empty!' });
				}
				return res.send(data);
			})
			.catch(() => next(errResponse('Error', 403)));
	}
};
