const User = require('../models/User');
const generateToken = require('../utils/jwt');
const {
  NOT_FOUND_CODE,
  ERROR_AUTH,
} = require('../utils/statusError');

const login = (req, res) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      console.log(generateToken);
      const token = generateToken({ _id: user._id });
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
        })
        .end();
    })
    .catch((err) => {
      if (err.name === 'NotFoundError') {
        res.status(NOT_FOUND_CODE).send({ message: err.message });
      } else {
        res.status(ERROR_AUTH).send({ message: err.message });
      }
    });
};

module.exports = {
  login,
};
