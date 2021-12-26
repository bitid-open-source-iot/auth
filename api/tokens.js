const bll = require('../bll/bll');
const router = require('express').Router();

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

router.post('/update', (req, res) => {
	var myModule = new bll.module();
	myModule.tokens.update(req, res);
});

router.post('/revoke', (req, res) => {
	var myModule = new bll.module();
	myModule.tokens.revoke(req, res);
});

router.put('/retrieve', (req, res) => {
	var myModule = new bll.module();
	myModule.tokens.retrieve(req, res);
});

router.post('/download', (req, res) => {
	var myModule = new bll.module();
	myModule.tokens.download(req, res);
});

router.post('/generate', (req, res) => {
	var myModule = new bll.module();
	myModule.tokens.generate(req, res);
});

router.post('/unsubscribe', (req, res) => {
	var myModule = new bll.module();
	myModule.tokens.unsubscribe(req, res);
});

router.post('/change-owner', (req, res) => {
	var myModule = new bll.module();
	myModule.tokens.changeowner(req, res);
});

router.post('/update-subscriber', (req, res) => {
	var myModule = new bll.module();
	myModule.tokens.updatesubscriber(req, res);
});

module.exports = router;