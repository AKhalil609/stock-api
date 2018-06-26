const request = require('request');

// open source stock api
var getStock = (symbol, callback) => {
	request(
		{
			url: `https://api.iextrading.com/1.0/stock/${symbol}/batch?types=quote,news,chart&range=1m&last=10`,
			json: true
		},
		(error, response, body) => {
			if (!error && response.code !== 400 && body !== 'Unknown symbol') {
				callback(undefined, {
					companyName: body.quote.companyName,
					symbol: body.quote.symbol,
					stockPrice: body.quote.latestPrice,
					stockStatus: body.quote.changePercent
				});
			} else {
				callback('Unable to fetch Stock.');
			}
		}
	);
};

module.exports.getStock = getStock;