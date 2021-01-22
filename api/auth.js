const bll = require('../bll/bll');
const router = require('express').Router();

router.post('/auth', (req, res) => {
	var myModule = new bll.module();
	myModule.auth.auth(req, res);
});

router.put('/verify', (req, res) => {
	var myModule = new bll.module();
	myModule.auth.verify(req, res);
});

router.put('/register', (req, res) => {
	var myModule = new bll.module();
	myModule.auth.register(req, res);
});

router.put('/validate', (req, res) => {
	var myModule = new bll.module();
	myModule.auth.validate(req, res);
});

router.post('/changeemail', (req, res) => {
	var myModule = new bll.module();
	myModule.auth.changeemail(req, res);
});

router.put('/authenticate', (req, res) => {
	var myModule = new bll.module();
	myModule.auth.authenticate(req, res);
});

router.post('/allowaccess', (req, res) => {
	var myModule = new bll.module();
	myModule.auth.allowaccess(req, res);
});

router.put('/resetpassword', (req, res) => {
	var myModule = new bll.module();
	myModule.auth.resetpassword(req, res);
});

router.put('/changepassword', (req, res) => {
	var myModule = new bll.module();
	myModule.auth.changepassword(req, res);
});

module.exports = router;