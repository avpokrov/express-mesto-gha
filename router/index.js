const router = require('express').Router();

router.use('/users', require('./users'));
router.use('/cards', require('./cards'));
router.use('/signup', require('./signup'));
router.use('/signin', require('./signin'));

module.exports = router;
