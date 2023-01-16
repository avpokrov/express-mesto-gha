const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');

const { CREATED_CODE } = require('../utils/statusError');

const Card = require('../models/Card');

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (err) {
    next(err);
  }
};

const createCard = async (req, res, next) => {
  try {
    const { name, link } = await req.body;
    if (!name || !link) {
      throw new BadRequestError('Переданы не корректные данные');
    }
    const card = await Card.create({
      name,
      link,
      owner: req.user._id,
    });
    res.status(CREATED_CODE).send({ data: card });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new BadRequestError('Переданы не корректные данные.'));
    }
    next(err);
  }
};

const delCard = async (req, res, next) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findById(cardId);
    if (!card) { throw new NotFoundError('Карточка не найдена'); }
    if (!card.owner.equals(req.user._id)) { throw new ForbiddenError('Доступ запрещен!'); }
    await Card.findByIdAndRemove(cardId);
    res.status(CREATED_CODE).send({ data: card });
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new BadRequestError('Передан не корректный id.'));
    }
    next(err);
  }
};

const addCardLike = async (req, res, next) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    if (!card) { throw new NotFoundError('Карточка не найдена.'); }
    res.send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new BadRequestError('Передан не корректный id карточки.'));
    }
    next(err);
  }
};

const delCardLike = async (req, res, next) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (!card) { throw new NotFoundError('Карточка не найдена.'); }
    res.send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new BadRequestError('Передан не корректный id карточки.'));
    }
    next(err);
  }
};

module.exports = {
  getCards, createCard, delCard, addCardLike, delCardLike,
};
