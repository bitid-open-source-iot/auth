const bll = require('../bll/bll');
const router = require('express').Router();

router.use((req, res, next) => {
  	next();
});

router.post('/add', (req, res) => {
	var myModule = new bll.module();
	myModule.scopes.add(req, res);
});

router.post('/get', (req, res) => {
	var myModule = new bll.module();
	myModule.scopes.get(req, res);
});

router.post('/list', (req, res) => {
	var myModule = new bll.module();
	myModule.scopes.list(req, res);
});

router.post('/update', (req, res) => {
	var myModule = new bll.module();
	myModule.scopes.update(req, res);
});

router.post('/delete', (req, res) => {
	var myModule = new bll.module();
	myModule.scopes.delete(req, res);
});

module.exports = router;