const { Router } = require('express');

const StockRoutes = require('../api/Stock/index');

const UserRoutes = require('../api/User/index');

const router = new Router();

// Stock Routes
router.use('/stock', StockRoutes);


// User Routes
router.use('/user', UserRoutes);

// HomePage Route
router.use('/', (req,res)=>{
	res.send('Welcom to The HomePage');
});
module.exports = router;
