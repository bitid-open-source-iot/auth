const router = require('express').Router();

router.use((req, res, next) => {
	next();
});

router.put('/get', (req, res) => {
	res.json(__settings.client);
});

module.exports = router;