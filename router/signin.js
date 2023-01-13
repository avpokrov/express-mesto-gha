const express = require('express');

const signinRoutes = express.Router();
const {
  login,
} = require('../controllers/signin');

signinRoutes.post('/', express.json(), login);

module.exports = signinRoutes;
