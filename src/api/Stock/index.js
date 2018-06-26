const { Router } = require('express');

const Stock = require('./Stock.Controller');

const router = new Router();

// gets all stock data
router.get('/', Stock.getAllData);
// adds one stock data to db by adding the company code
router.post('/:symbol', Stock.addOne);
// updates the stock data
router.patch('/', Stock.updateStock);
// retrives the stock info of one stock
router.get('/:symbol', Stock.getStock);

module.exports = router;
