const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Это поле обязательно к заполнению'],
  },
  director: {
    type: String,
    required: [true, 'Это поле обязательно к заполнению'],
  },
  duration: {
    type: Number,
    required: [true, 'Это поле обязательно к заполнению'],
  },
  year: {
    type: String,
    required: [true, 'Это поле обязательно к заполнению'],
  },
  description: {
    type: String,
    required: [true, 'Это поле обязательно к заполнению'],
  },
  image: {
    type: String,
    required: [true, 'Это поле обязательно к заполнению'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректный URL',
    },
  },
  trailerLink: {
    type: String,
    required: [true, 'Это поле обязательно к заполнению'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректный URL',
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'Это поле обязательно к заполнению'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректный URL',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRu: {
    type: String,
    required: [true, 'Это поле обязательно к заполнению'],
  },
  nameEng: {
    type: String,
    required: [true, 'Это поле обязательно к заполнению'],
  },
});

module.exports = mongoose.model('movie', movieSchema);
