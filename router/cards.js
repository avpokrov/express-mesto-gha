const express = require('express');

const cardsRoutes = express.Router();
const {
  getCards,
  createCard,
  delCard,
  addCardLike,
  delCardLike,
} = require('../controllers/cards');

cardsRoutes.get('/', getCards);
cardsRoutes.post('/', express.json(), createCard);
cardsRoutes.delete('/:cardId', delCard);
cardsRoutes.put('/:cardId/likes', addCardLike);
cardsRoutes.delete('/:cardId/likes', delCardLike);

module.exports = cardsRoutes;
