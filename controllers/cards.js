const Card = require('../models/Card');
const {
  NOT_FOUND_CODE,
  SERVER_ERROR_CODE,
  CREATED_CODE,
  ERROR_CODE,
} = require('../utils/statusError');
const { errNotFound } = require('../utils/error');

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (err) {
    res.status(SERVER_ERROR_CODE).send({ message: 'На сервере произошла ошибка' });
  }
};

const createCard = async (req, res) => {
  try {
    const { name, link } = await req.body;
    const card = await Card.create({
      name,
      link,
      owner: req.user._id,
    });
    res.status(CREATED_CODE).send({ data: card });
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(ERROR_CODE).send({ message: 'Переданны не корректные данные' });
    } else {
      res.status(SERVER_ERROR_CODE).send({ message: 'На сервере произошла ошибка' });
    }
  }
};

const delCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findByIdAndRemove(cardId);
    if (!card) { throw errNotFound; }
    res.status(CREATED_CODE).send({ data: card });
  } catch (err) {
    switch (err.name) {
      case 'CastError':
        res.status(ERROR_CODE).send({ message: 'Передан не корректный ID' });
        break;
      case 'NotFoundError':
        res.status(NOT_FOUND_CODE).send({ message: 'Карточка не найдена' });
        break;
      default:
        res.status(SERVER_ERROR_CODE).send({ message: 'На сервере произошла ошибка' });
        break;
    }
  }
};

const addCardLike = async (req, res) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    if (!card) { throw errNotFound; }
    res.send(card);
  } catch (err) {
    switch (err.name) {
      case 'CastError':
        res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные' });
        break;
      case 'NotFoundError':
        res.status(NOT_FOUND_CODE).send({ message: 'Карточка не найдена' });
        break;
      default:
        res.status(SERVER_ERROR_CODE).send({ message: 'На сервере произошла ошибка' });
        break;
    }
  }
};

const delCardLike = async (req, res) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (!card) { throw errNotFound; }
    res.send(card);
  } catch (err) {
    switch (err.name) {
      case 'CastError':
        res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные' });
        break;
      case 'NotFoundError':
        res.status(NOT_FOUND_CODE).send({ message: 'Карточка не найдена' });
        break;
      default:
        res.status(SERVER_ERROR_CODE).send({ message: 'На сервере произошла ошибка' });
        break;
    }
  }
};

module.exports = {
  getCards, createCard, delCard, addCardLike, delCardLike,
};
