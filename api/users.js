const bll = require('../bll/bll');
const router = require('express').Router();

router.use((req, res, next) => {
	next();
});

router.post('/get', (req, res) => {
	var myModule = new bll.module();
	myModule.users.get(req, res);
});

router.post('/list', (req, res) => {
	var myModule = new bll.module();
	myModule.users.list(req, res);
});

router.post('/update', (req, res) => {
	var myModule = new bll.module();
	myModule.users.update(req, res);
});

router.post('/delete', (req, res) => {
	var myModule = new bll.module();
	myModule.users.delete(req, res);
});

module.exports = router;