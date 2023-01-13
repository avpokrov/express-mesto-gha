const jwt = require('jsonwebtoken');

const { JWT_SECRET, NODE_ENV } = process.env;

function generateToken(payload) {
  return jwt.sign(
    payload,
    'dev_secret',
    { expiresIn: '7d' },
  );
}

module.exports = generateToken;
