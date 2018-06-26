const Stock = require('../Stock/Stock.Service');
const userModel = require('../../models/users');
const bodyParser = require('body-parser');
const express = require('express');

var asyncLoop = require('node-async-loop');



const app = express();
app.use(bodyParser.json());

class User {
	constructor(data) {
		if (data) {
			this.Name = data.Name;
			this.personalID = data.personalID;
			this.investment = data.investment;
			this.stocks = data.stocks;
		}
	}

	// Add new user
	add(data) {
		const user = new userModel(data);
		return user
			.save()
			.then(result => result)
			.catch(e => e);
	}

	// Get all users
	getAll() {
		return userModel.find({}).then(
			users => {
				return users;
			},
			e => {
				return e;
			}
		);
	}

	// Retrive one user info
	getOne(data) {
		return userModel.findOne({ personalID: data }).then(
			users => {
				return users;
			},
			e => {
				return e;
			}
		);
	}

	// Modify investment
	invest(ID1, data){
		var newAsset = data.asset;
		return Stock.getStockStatus(newAsset).then(comp =>
			userModel.findOneAndUpdate({ personalID: ID1, 'stocks.asset': data.asset }, 
				{ $set: { 'stocks.$.investment': data.investment, 'stocks.$.initialStockStauts': comp} }, 
				{ new: true })
				.then(
					users => {
						return users;
					},
					e => {
						return e;
					}
				)
		);
			
	}

	// Add new invetment to the user profile
	newInvest(ID1, data){
		var newAsset = data.asset;
		return Stock.getStockStatus(newAsset)
			.then(comp =>
				userModel.findOneAndUpdate(
					{ personalID: ID1 },
					{
						$push: {
							stocks: {
								asset: data.asset,
								investment: data.investment,
								initialStockStauts: comp
							}
						}
					},
					{ new: true }
				)
			)
			.then(users => {
				return users;
			}, e => {
				return e;
			});
	}
	
	//Updates the Stock percentage change and updates the profit for each invetment the user has

	getProfit(ID1){
		var stockArr = [];
		var compArr = [];
		const instance = new Stock();
        
		return instance.updateAll().then(() => {
			return Stock.getStockStatus();
		})
			.then(data => {
				stockArr = data;
			})
			.then(() => {
				return userModel.findOne({ personalID: ID1 }).select('stocks');
			})
			.then(data => {
				compArr = data.stocks;
			})
			.then(() => {
				
				asyncLoop(stockArr, (item, next)=>{
					var compName = item.symbol;
					var compStat = item.stockStatus;
					var breakpoint = true;
					asyncLoop(compArr, (item, next)=> {
						var invCompName = item.asset;
						var invProfit = item.profit;
						var initalStatus = item.initialStockStauts;
						var investment = item.investment;

						if (invCompName === compName && breakpoint) {
							invProfit = investment * (compStat - initalStatus);
							return userModel
								.findOneAndUpdate(
									{ personalID: ID1, 'stocks.asset': invCompName },
									{ $set: { 'stocks.$.profit': invProfit } },
									{ new: true }
								).select('stocks')
								.then(
									users => {
										breakpoint = false;
										return users;
									},
									e => {
										return e;
									}
								);
						}
						next();
					});
					next();
				});
				
			}).then(() =>{
				var data =  userModel.findOne({ personalID: ID1 }).select('stocks');
				
				return data;
			});
	}
}


module.exports = User;