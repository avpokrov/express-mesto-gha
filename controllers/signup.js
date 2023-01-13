const bcrypt = require('bcryptjs');
const User = require('../models/User');
const {
  NOT_FOUND_CODE,
  SERVER_ERROR_CODE,
  CREATED_CODE,
  ERROR_CODE,
  ERROR_AUTH,
} = require('../utils/statusError');

const createUser = async (req, res) => {
  try {
    const {
      password,
    } = req.body;
    const hashPass = await bcrypt.hash(password, 10);
    const user = await User.create({
      password: hashPass,
      email: req.body.email,
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
    });
    res.status(CREATED_CODE).send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(ERROR_CODE).send({ message: 'Переданны не корректные данные', ...req.body });
    } else {
      res.status(SERVER_ERROR_CODE).send({ message: 'На сервере произошла ошибка' });
    }
  }
};

module.exports = {
  createUser,
};
