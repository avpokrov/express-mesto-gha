const User = require('../models/User');

const getUsers = async (req, res) => {
  const users = await User.find({});
  res.status(200).send(users);
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user= await User.findById(id);
    res.status(200).send(user);
  } catch (err) {
    if(err.name == 'CastError'){
      res.status(400).send({message: 'incorrect ID', ...err});
    } else {
      res.status(500).send({message: 'Ошибка обработки запроса'});
    }
  }
};

const createUser = async (req, res) => {
  const newUser = await new User(req.body);
  res.status(201).send(await newUser.save());
};

module.exports = { getUsers, getUserById, createUser };
