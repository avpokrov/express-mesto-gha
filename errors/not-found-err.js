const { NOT_FOUND_CODE } = require('../utils/statusError');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_FOUND_CODE;
  }
}

module.exports = NotFoundError;
