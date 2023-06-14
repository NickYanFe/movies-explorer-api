const userRoutes = require('express').Router();

const {
  getUsers,
  getUser,
  getUserById,
  updateUser,
} = require('../controllers/users');

const {
  validationUserId,
  validationUpdateUser,
} = require('../middlewares/validations');

userRoutes.get('/', getUsers);
userRoutes.get('/me', getUser);
userRoutes.get('/:userId', validationUserId, getUserById);
userRoutes.patch('/me', validationUpdateUser, updateUser);

module.exports = userRoutes;
