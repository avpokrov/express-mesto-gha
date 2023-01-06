const User = require('../models/User');
const {
  NOT_FOUND_CODE,
  SERVER_ERROR_CODE,
  CREATED_CODE,
  ERROR_CODE,
} = require('../utils/statusError');
const { errNotFound } = require('../utils/error');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(SERVER_ERROR_CODE).send({ message: 'На сервере произошла ошибка' });
  }
};

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(CREATED_CODE).send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(ERROR_CODE).send({ message: 'Переданны не корректные данные' });
    } else {
      res.status(SERVER_ERROR_CODE).send({ message: 'На сервере произошла ошибка' });
    }
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) { throw errNotFound; }
    res.send(user);
  } catch (err) {
    switch (err.name) {
      case 'CastError':
        res.status(ERROR_CODE).send({ message: 'Передан не корректный ID' });
        break;
      case 'NotFoundError':
        res.status(NOT_FOUND_CODE).send({ message: 'Пользователь не найден' });
        break;
      default:
        res.status(SERVER_ERROR_CODE).send({ message: 'На сервере произошла ошибка' });
        break;
    }
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const {
      name,
      about,
    } = req.body;
    const newProfile = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      {
        new: true,
        runValidators: true,
      },
    );
    if (!newProfile) { throw errNotFound; }
    res.send({ data: newProfile });
  } catch (err) {
    switch (err.name) {
      case 'ValidationError':
        res.status(ERROR_CODE).send({ message: 'Переданы не корректные данные' });
        break;
      case 'NotFoundError':
        res.status(NOT_FOUND_CODE).send({ message: 'Пользователь не найден' });
        break;
      default:
        res.status(SERVER_ERROR_CODE).send({ message: 'На сервере произошла ошибка' });
        break;
    }
  }
};

const updateUserAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;
    const newAvatar = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      {
        new: true,
        runValidators: true,
      },
    );
    if (!newAvatar) { throw errNotFound; }
    res.send({ data: newAvatar });
  } catch (err) {
    switch (err.name) {
      case 'ValidationError':
        res.status(ERROR_CODE).send({ message: 'Переданы не корректные данные' });
        break;
      case 'NotFoundError':
        res.status(NOT_FOUND_CODE).send({ message: 'Пользователь не найден' });
        break;
      default:
        res.status(SERVER_ERROR_CODE).send({ message: 'На сервере произошла ошибка' });
        break;
    }
  }
};

module.exports = {
  getUsers, getUserById, createUser, updateUserProfile, updateUserAvatar,
};
