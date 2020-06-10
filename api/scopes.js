var express 	= require('express');
var router 		= express.Router();
var bllModule	= require('../bll/bll');

router.put('/list', (req, res) => {
	var myModule = new bllModule.module();
	myModule.scopes.list(req, res);
});

router.post('/add', (req, res) => {
	var myModule = new bllModule.module();
	myModule.scopes.add(req, res);
});

router.post('/get', (req, res) => {
	var myModule = new bllModule.module();
	myModule.scopes.get(req, res);
});

router.post('/list', (req, res) => {
	var myModule = new bllModule.module();
	myModule.scopes.list(req, res);
});

router.post('/update', (req, res) => {
	var myModule = new bllModule.module();
	myModule.scopes.update(req, res);
});

router.post('/delete', (req, res) => {
	var myModule = new bllModule.module();
	myModule.scopes.delete(req, res);
});

module.exports = router;