const bll = require('../bll/bll');
const router = require('express').Router();

router.use((req, res, next) => {
  	next();
});

router.post('/add', (req, res) => {
	var myModule = new bll.module();
	myModule.tipsAndUpdates.add(req, res);
});

router.post('/get', (req, res) => {
	var myModule = new bll.module();
	myModule.tipsAndUpdates.get(req, res);
});

router.post('/list', (req, res) => {
	var myModule = new bll.module();
	myModule.tipsAndUpdates.list(req, res);
});

router.post('/update', (req, res) => {
	var myModule = new bll.module();
	myModule.tipsAndUpdates.update(req, res);
});

router.post('/delete', (req, res) => {
	var myModule = new bll.module();
	myModule.tipsAndUpdates.delete(req, res);
});

module.exports = router;