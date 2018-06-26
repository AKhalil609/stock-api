const { Router } = require('express');

const User = require('./User.Controller');

const router = new Router();


//add new user
router.post('/', User.addUser);

// get all users
router.get('/', User.getAllUsers);

// get info for a user
router.get('/:personalID', User.getOneUser);

//add investment for specific user
router.put('/:personalID', User.addInvestment);

//get Profit for specific user
router.post('/:personalID', User.getProfit);
module.exports = router;
