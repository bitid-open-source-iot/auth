const bll = require('../bll/bll');
const router = require('express').Router();

router.post('/usage', (req, res) => {
	var myModule = new bll.module();
	myModule.statistics.usage(req, res);
});

module.exports = router;