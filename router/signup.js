const express = require('express');

const signupRoutes = express.Router();
const {
  createUser,
} = require('../controllers/signup');

signupRoutes.post('/', express.json(), createUser);

module.exports = signupRoutes;
