var bll		= require('../bll/bll');
var router 	= require('express').Router();

router.use(function timeLog(req, res, next) {
  	next();
});

router.post('/get', (req, res) => {
	var myModule = new bllModule.module();
	myModule.users.get(req, res);
});

router.post('/list', (req, res) => {
	var myModule = new bllModule.module();
	myModule.users.list(req, res);
});

router.post('/update', (req, res) => {
	var myModule = new bllModule.module();
	myModule.users.update(req, res);
});

router.post('/delete', (req, res) => {
	var myModule = new bllModule.module();
	myModule.users.delete(req, res);
});

router.post('/getusers', (req, res) => {
	var myModule = new bllModule.module();
	myModule.users.getUsers(req, res);
});

module.exports = router;