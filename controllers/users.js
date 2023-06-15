const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { NODE_ENV, JWT_SECRET } = require('../utils/config');
const userSchema = require('../models/user');
const BAD_REQUEST = require('../errors/BAD_REQUEST');
const NOT_FOUND = require('../errors/NOT_FOUND');
const CONFLICT_ERROR = require('../errors/CONFLICT_ERROR');

module.exports.getUsers = (req, res, next) => {
  userSchema
    .find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  const { userId } = req.params;

  userSchema
    .findById(userId)
    .then((user) => {
      if (!user) {
        throw new NOT_FOUND('Пользователь c данным _id не найден.');
      }
      res.send({ data: user });
    })

    .catch((err) => {
      if (err.name === 'CastError') {
        return next(
          new BAD_REQUEST(
            'Для поиска пользователя переданы некорректные данные',
          ),
        );
      }

      return next(err);
    });
};

module.exports.getUser = (req, res, next) => {
  userSchema
    .findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NOT_FOUND('Пользователь не найден');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(BAD_REQUEST('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};
module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      userSchema
        .create({
          name,
          email,
          password: hash,
        })
        .then(() => res.status(201).send({
          data: {
            name,
            email,
          },
        }))
        .catch((err) => {
          if (err.code === 11000) {
            return next(
              new CONFLICT_ERROR('Пользователь c таким email уже существует'),
            );
          }
          if (err.name === 'ValidationError') {
            return next(
              new BAD_REQUEST(
                'Переданы некорректные данные для создания пользователя',
              ),
            );
          }
          return next(err);
        });
    })
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { email, name } = req.body;

  userSchema
    .findByIdAndUpdate(
      req.user._id,
      {
        email,
        name,
      },
      {
        new: true,
        runValidators: true,
      },
    )
    .orFail(() => {
      throw new NOT_FOUND('Пользователь с данным _id не найден');
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.code === 11000) {
        return next(
          new CONFLICT_ERROR('Пользователь c таким email уже существует'),
        );
      }
      if (err.name === 'ValidationError') {
        return next(
          new BAD_REQUEST(
            'При обновлении профиля пользователя переданы некорректные данные',
          ),
        );
      }
      return next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return userSchema
    .findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'secret-JWT-token',
        {
          expiresIn: '7d',
        },
      );
      res.send({ token });
    })
    .catch(next);
};
