const express = require('express');

const router = express.Router();
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');

router.use('/users', auth, require('./users'));
router.use('/cards', auth, require('./cards'));

router.post('/signin', express.json(), login);
router.post('/signup', express.json(), createUser);

module.exports = router;
