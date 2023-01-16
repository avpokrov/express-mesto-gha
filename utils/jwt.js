const jwt = require('jsonwebtoken');

const { JWT_SECRET, NODE_ENV } = process.env;

function generateToken(payload) {
  return jwt.sign(
    payload,
    NODE_ENV === 'production' ? JWT_SECRET : 'dev_secret',
    { expiresIn: '7d' },
  );
}

module.exports = generateToken;
