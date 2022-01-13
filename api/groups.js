const bll = require('../bll/bll');
const router = require('express').Router();

router.use((req, res, next) => {
  	next();
});

router.post('/add', (req, res) => {
	var myModule = new bll.module();
	myModule.groups.add(req, res);
});

router.post('/get', (req, res) => {
	var myModule = new bll.module();
	myModule.groups.get(req, res);
});

router.post('/list', (req, res) => {
	var myModule = new bll.module();
	myModule.groups.list(req, res);
});

router.post('/share', (req, res) => {
	var myModule = new bll.module();
	myModule.groups.share(req, res);
});

router.post('/update', (req, res) => {
	var myModule = new bll.module();
	myModule.groups.update(req, res);
});

router.post('/delete', (req, res) => {
	var myModule = new bll.module();
	myModule.groups.delete(req, res);
});

router.post('/unsubscribe', (req, res) => {
	var myModule = new bll.module();
	myModule.groups.unsubscribe(req, res);
});

router.post('/change-owner', (req, res) => {
	var myModule = new bll.module();
	myModule.groups.changeowner(req, res);
});

router.post('/update-subscriber', (req, res) => {
	var myModule = new bll.module();
	myModule.groups.updatesubscriber(req, res);
});

module.exports = router;