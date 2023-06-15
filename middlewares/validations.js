const isURL = require('validator/lib/isURL');
const isEmail = require('validator/lib/isEmail');
const { Joi, celebrate } = require('celebrate');

const BAD_REQUEST = require('../errors/BAD_REQUEST');

const validationUrl = (url) => {
  const validate = isURL(url);
  if (validate) {
    return url;
  }
  throw new BAD_REQUEST('Некорректный URL');
};

const validationEmail = (email) => {
  const validate = isEmail(email);
  if (validate) {
    return email;
  }
  throw new BAD_REQUEST('Некорректный email');
};

const validationId = (id) => {
  const regex = /^[0-9a-fA-F]{24}$/;
  if (regex.test(id)) return id;
  throw new BAD_REQUEST('Некорректный ID');
};

module.exports.validationCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().custom(validationEmail),
    password: Joi.string().required(),
  }),
});

module.exports.validationLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom(validationEmail),
    password: Joi.string().required(),
  }),
});

module.exports.validationUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().custom(validationId),
  }),
});

module.exports.validationUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().custom(validationEmail),
  }),
});

module.exports.validationCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    movieId: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(validationUrl),
    trailerLink: Joi.string().required().custom(validationUrl),
    thumbnail: Joi.string().required().custom(validationUrl),
    nameRu: Joi.string().required(),
    nameEng: Joi.string().required(),
  }),
});

module.exports.validationMovieById = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().custom(validationId),
  }),
});
