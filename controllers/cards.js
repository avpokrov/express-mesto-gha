const Card = require('../models/Card');

const getCards= async (req, res) => {
    const cards = await Card.find({});
    res.status(200).send(cards);
  };

const createCard = async (req, res) => {
    const { name, link } =  await req.body;
    const card = await Card.create({
        name,
        link,
        owner: req.user._id,
    });
    res.status(201).send({data: card,
    });
  };

const delCard = async (req, res) => {
    try {
      const { id } = req.params;
      const delCard = await Card.findByIdAndRemove(id);
      res.status(200).send({data: delCard});
    } catch (err) {
      if(err.name == 'CastError'){
        res.status(400).send({message: 'incorrect ID', ...err});
      } else {
        res.status(500).send({message: 'Ошибка обработки запроса'});
      }
    }
  };

  
  module.exports = { getCards, createCard, delCard };
  