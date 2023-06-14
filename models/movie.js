const { Number } = require('joi');
const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Это поле обязательно к заполнению'],
    // minlength: [2, 'Минимальная длина текста в данном поле = 2 знака '],
    // maxlength: [30, 'Максимальная длина текста в данном поле = 30 знаков '],
  },
  director: {
    type: String,
    required: [true, 'Это поле обязательно к заполнению'],
    // minlength: [2, 'Минимальная длина текста в данном поле = 2 знака '],
    // maxlength: [30, 'Максимальная длина текста в данном поле = 30 знаков '],
  },
  duration: {
    type: Number,
    required: [true, 'Это поле обязательно к заполнению'],
    // minlength: [2, 'Минимальная длина текста в данном поле = 2 знака '],
    // maxlength: [5, 'Максимальная длина текста в данном поле = 5 знаков '],
  },
  year: {
    type: String,
    required: [true, 'Это поле обязательно к заполнению'],
    // minlength: [2, 'Минимальная длина текста в данном поле = 2 знака '],
    // maxlength: [4, 'Максимальная длина текста в данном поле = 4 знака '],
  },
  description: {
    type: String,
    required: [true, 'Это поле обязательно к заполнению'],
    // minlength: [2, 'Минимальная длина текста в данном поле = 2 знака '],
    // maxlength: [100, 'Максимальная длина текста в данном поле = 100 знаков '],
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
    // ref: 'movieId',
  },
  nameRu: {
    type: String,
    required: [true, 'Это поле обязательно к заполнению'],
    // minlength: [2, 'Минимальная длина текста в данном поле = 2 знака '],
    // maxlength: [30, 'Максимальная длина текста в данном поле = 30 знаков '],
  },
  nameEng: {
    type: String,
    required: [true, 'Это поле обязательно к заполнению'],
    // minlength: [2, 'Минимальная длина текста в данном поле = 2 знака '],
    // maxlength: [30, 'Максимальная длина текста в данном поле = 30 знаков '],
  },

  //   link: {
  //     type: String,
  //     required: [true, 'Это поле обязательно к заполнению'],
  //     validate: {
  //       validator: (v) => validator.isURL(v),
  //       message: 'Некорректный URL',
  //     },
  //   },
  //   owner: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     required: true,
  //     ref: 'user',
  //   },
  //   likes: [
  //     {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: 'user',
  //       default: [],
  //     },
  //   ],
  //   createdAt: {
  //     type: Date,
  //     default: Date.now,
  //   },
  // },
  // { versionKey: false },
});

module.exports = mongoose.model('movie', movieSchema);
