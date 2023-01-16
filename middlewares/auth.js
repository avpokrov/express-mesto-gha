const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');

const {
  JWT_SECRET,
  NODE_ENV,
} = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    if (!token) {
      throw new UnauthorizedError('Необходима авторизация');
    }
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev_secret');
  } catch (err) {
    next(err);
  }

  req.user = payload;

  next();
};
