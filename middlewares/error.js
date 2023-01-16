const { SERVER_ERROR_CODE } = require('../utils/statusError');

module.exports = (err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(SERVER_ERROR_CODE).send({ message: 'Ошибка на стороне сервера!' });
  }
};
