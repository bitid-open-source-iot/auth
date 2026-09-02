const bll = require('../bll/bll');
const router = require('express').Router();
const validation = require('../lib/validation');

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

router.put('/register', validation.validateRegisterRequest, (req, res) => {
	var myModule = new bll.module();
	myModule.auth.register(req, res);
});

router.put('/validate', (req, res) => {
	var myModule = new bll.module();
	myModule.auth.validate(req, res);
});

router.put('/authenticate', validation.validateAuthRequest, (req, res) => {
	var myModule = new bll.module();
	myModule.auth.authenticate(req, res);
});

router.post('/change-email', validation.validateAuthRequest, (req, res) => {
	var myModule = new bll.module();
	myModule.auth.changeemail(req, res);
});

router.post('/allowaccess', validation.validateAuthRequest, (req, res) => {
	var myModule = new bll.module();
	myModule.auth.allowaccess(req, res);
});

router.post('/allow-access', validation.validateAuthRequest, (req, res) => {
	var myModule = new bll.module();
	myModule.auth.allowaccess(req, res);
});

router.put('/reset-password', validation.validateAuthRequest, (req, res) => {
	var myModule = new bll.module();
	myModule.auth.resetpassword(req, res);
});

router.put('/change-password', (req, res) => {
	var myModule = new bll.module();
	myModule.auth.changepassword(req, res);
});

router.post('/delete', validation.validateAuthRequest, (req, res) => {
	var myModule = new bll.module();
	myModule.auth.deleteAccount(req, res);
});

module.exports = router;