const bll = require('../bll/bll');
const router = require('express').Router();

router.use((req, res, next) => {
  	next();
});

router.put('/get', (req, res) => {
	var myModule = new bll.module();
	myModule.config.get(req, res)
});

module.exports = router;