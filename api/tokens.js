var bll		= require('../bll/bll');
var router 	= require('express').Router();

router.post('/get', (req, res) => {
	var myModule = new bll.module();
	myModule.tokens.get(req, res);
});

router.post('/list', (req, res) => {
	var myModule = new bll.module();
	myModule.tokens.list(req, res);
});

router.post('/share', (req, res) => {
	var myModule = new bll.module();
	myModule.tokens.share(req, res);
});

router.post('/revoke', (req, res) => {
	var myModule = new bll.module();
	myModule.tokens.revoke(req, res);
});

router.post('/retrieve', (req, res) => {
	var myModule = new bll.module();
	myModule.tokens.retrieve(req, res);
});

router.post('/generate', (req, res) => {
	var myModule = new bll.module();
	myModule.tokens.generate(req, res);
});

router.post('/unsubscribe', (req, res) => {
	var myModule = new bll.module();
	myModule.tokens.unsubscribe(req, res);
});

router.post('/updatesubscriber', (req, res) => {
	var myModule = new bll.module();
	myModule.tokens.updatesubscriber(req, res);
});

module.exports = router;