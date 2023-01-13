const express = require('express');

const userRoutes = express.Router();
const {
  getUsers,
  getUserById,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');

userRoutes.get('/', getUsers);
userRoutes.get('/:id', getUserById);
userRoutes.patch('/me', express.json(), updateUserProfile);
userRoutes.patch('/me/avatar', express.json(), updateUserAvatar);

module.exports = userRoutes;
