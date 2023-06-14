const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const NOT_AUTH = require('../errors/NOT_AUTH');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new NOT_AUTH('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'secret-JWT-token',
    );
  } catch (err) {
    return next(new NOT_AUTH('Необходима авторизация'));
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  return next(); // пропускаем запрос дальше
};
