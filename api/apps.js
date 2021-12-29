const bll = require('../bll/bll');
const router = require('express').Router();

router.post('/add', (req, res) => {
	var myModule = new bll.module();
	myModule.apps.add(req, res);
});

router.post('/get', (req, res) => {
	var myModule = new bll.module();
	myModule.apps.get(req, res);
});

router.post('/list', (req, res) => {
	var myModule = new bll.module();
	myModule.apps.list(req, res);
});

router.post('/share', (req, res) => {
	var myModule = new bll.module();
	myModule.apps.share(req, res);
});

router.post('/update', (req, res) => {
	var myModule = new bll.module();
	myModule.apps.update(req, res);
});

router.post('/delete', (req, res) => {
	var myModule = new bll.module();
	myModule.apps.delete(req, res);
});

router.put('/is-admin', (req, res) => {
	var myModule = new bll.module();
	myModule.apps.isadmin(req, res);
});

router.get('/manifest', (req, res) => {
	var myModule = new bll.module();
	myModule.apps.manifest(req, res);
});

router.post('/unsubscribe', (req, res) => {
	var myModule = new bll.module();
	myModule.apps.unsubscribe(req, res);
});

router.post('/change-owner', (req, res) => {
	var myModule = new bll.module();
	myModule.apps.changeowner(req, res);
});

router.post('/update-subscriber', (req, res) => {
	var myModule = new bll.module();
	myModule.apps.updatesubscriber(req, res);
});

module.exports = router;