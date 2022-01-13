const bll = require('../bll/bll');
const router = require('express').Router();

router.use((req, res, next) => {
  	next();
});

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

router.put('/authenticate', (req, res) => {
	var myModule = new bll.module();
	myModule.auth.authenticate(req, res);
});

router.post('/change-email', (req, res) => {
	var myModule = new bll.module();
	myModule.auth.changeemail(req, res);
});

router.post('/allow-access', (req, res) => {
	var myModule = new bll.module();
	myModule.auth.allowaccess(req, res);
});

router.put('/reset-password', (req, res) => {
	var myModule = new bll.module();
	myModule.auth.resetpassword(req, res);
});

router.put('/change-password', (req, res) => {
	var myModule = new bll.module();
	myModule.auth.changepassword(req, res);
});

module.exports = router;