const StockModel = require('../../models/track');
const { getStock } = require('../../services/iexTrading');
const bodyParser = require('body-parser');
const express = require('express');
var asyncLoop = require('node-async-loop');


const app = express();
app.use(bodyParser.json());

class Stock {
	constructor(data) {
		if (data) {
			this.companyName = data.companyName;
			this.symbol = data.symbol;
			this.stockPrice = data.stockPrice;
			this.stockStatus = data.stockStatus;
		}
	}

	// adds one stock
	addOne(x) {
		const stock = new StockModel(x);
		return stock
			.save()
			.then(result => result)
			.catch(e => e);
	}

	// retrives all stocks
	getAll() {

		return StockModel.find({}).then(stock => {
			return stock;
		}, e => {
			return e;
		});
	}

	// compare old date and new data and updates the stock db
	updateAll() {
		return StockModel.find({}).then(stock => {

			asyncLoop(stock,(item, next)=>{
				var symbol = item.symbol;
				var oldDate = item.createdAt;
				oldDate = oldDate.getFullYear() + '-' + (oldDate.getMonth() + 1) + '-' + oldDate.getDate();

				var nowDate = new Date();
				nowDate = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate();
				if (oldDate < nowDate) {

					getStock(symbol, (err, results) => {
                        
						if (err) {
							throw err;
						} else {
							var query = { symbol: symbol };
							var update = { stockPrice: results.stockPrice, stockStatus: results.stockStatus, createdAt: new Date() };
							return StockModel.findOneAndUpdate(
								query,
								update,
								{},
								(err) => {
									if (err) throw err;
								}
							);
						}
					});
				}
				next();
			});
		}, e => {
			return e;
		});

        
	}

	// returns info of one stock
	getOne(x) {
		return StockModel.findOne({ symbol: x }).then(stock => {
			return stock;
		}, e => {
			return e;
		});
	}
    
	
}

// retrives the stock status of a company
var getStockStatus = function getStockStatus(comp) {
	if (comp) {
		return StockModel.findOne({ symbol: comp }).then(
			stock => {

				return stock.stockStatus;
			},
			e => {
				return e;
			}
		);
	}else{
		return StockModel.find({}).then(
			stock => {

				return stock;
			},
			e => {
				return e;
			}
		);
	}
	
};

module.exports = Stock;
module.exports.getStockStatus = getStockStatus;
