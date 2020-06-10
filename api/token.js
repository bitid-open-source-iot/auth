var express 	= require('express');
var router 		= express.Router();
var bllModule	= require('../bll/bll');

router.post('/retrieve', function(req, res) {
	var myModule = new bllModule.module();
	myModule.tokens.retrieve(req, res);
});

module.exports = router;