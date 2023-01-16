const bcrypt = require('bcryptjs');
const User = require('../models/User');
const generateToken = require('../utils/jwt');

const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');

const { CREATED_CODE } = require('../utils/statusError');

const login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) { throw new BadRequestError('Переданы не корректные данные.'); }
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = generateToken({ _id: user._id });
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
        })
        .end();
    })
    .catch((err) => {
      next(err);
    });
};

const createUser = async (req, res, next) => {
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
      return next(new BadRequestError('Переданы не коректные данные'));
    }
    next(err);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.findOne({ });
    res.send(users);
  } catch (err) {
    next(err);
  }
};

const getMyUser = async (req, res, next) => {
  try {
    const { id } = { id: req.user._id };
    const user = await User.findById(id);
    if (!user) { throw new NotFoundError('Пользователь не найден.'); }
    res.send(user);
  } catch (err) {
    next(err);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) { throw new NotFoundError('Пользователь не найден.'); }
    res.send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new BadRequestError('Передан не корректный id.'));
    }
    next(err);
  }
};

const updateUserProfile = async (req, res, next) => {
  try {
    const {
      name,
      about,
    } = req.body;
    if (!name && !about) { return next(new BadRequestError('Переданы не корректные данные.')); }
    const newProfile = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      {
        new: true,
        runValidators: true,
      },
    );
    if (!newProfile) { throw NotFoundError('Пользователь не найден!'); }
    res.send({ data: newProfile });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new BadRequestError('Переданы не коректные данные'));
    }
    next(err);
  }
};

const updateUserAvatar = async (req, res, next) => {
  try {
    const { avatar } = req.body;
    if (!avatar) { return next(new BadRequestError('Переданы не корректные данные.')); }
    const newAvatar = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      {
        new: true,
        runValidators: true,
      },
    );
    if (!newAvatar) { throw NotFoundError('Пользователь не найден!'); }
    res.send({ data: newAvatar });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new BadRequestError('Переданы не коректные данные'));
    }
    next(err);
  }
};

module.exports = {
  getUsers,
  getUserById,
  updateUserProfile,
  updateUserAvatar,
  getMyUser,
  login,
  createUser,
};
