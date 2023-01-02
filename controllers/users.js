// const User = require('../models/User');

const getUsers = (req, res) => {
  res.status(200).send('hellp');
};

const getUserById = (req, res) => {
  const { id } = req.params;
  res.status(200).send(`get by ${id} users`);
};

const createUser = (req, res) => {
  res.send('Create Users');
};

module.exports = { getUsers, getUserById, createUser };
