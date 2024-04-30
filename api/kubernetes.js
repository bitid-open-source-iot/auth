const bll = require('../bll/bll');
const router = require('express').Router();

router.use((req, res, next) => {
	next();
});

router.get('/', (req, res) => {
	res.status(200).json({})
});

module.exports = router;