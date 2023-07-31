const movieSchema = require('../models/movie');
const BAD_REQUEST = require('../errors/BAD_REQUEST');
const NOT_FOUND = require('../errors/NOT_FOUND');
const FORBIDDEN_ERROR = require('../errors/FORBIDDEN_ERROR');

module.exports.getMovies = (req, res, next) => {
  const { _id } = req.user;
  movieSchema
    .find({ owner: _id })
    .populate('owner', '_id')
    .then((movies) => {
      if (movies) return res.status(200).send(movies);
      throw new NOT_FOUND('Не найдено');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BAD_REQUEST('Передан некорректный id пользователя'));
      } else next(err);
    });
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    movieId,
    thumbnail,
    nameRu,
    nameEng,
  } = req.body;
  const owner = req.user._id;

  movieSchema
    .create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      owner,
      movieId,
      nameRu,
      nameEng,
    })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          new BAD_REQUEST('Для создания фильма переданы некорректные данные'),
        );
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;

  movieSchema
    .findById(movieId)
    .orFail(new NOT_FOUND('Фильм c данным _id не найден.'))
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        return next(
          new FORBIDDEN_ERROR(
            'Данный фильм принадлежит другому пользователю и не может быть удален',
          ),
        );
      }

      return movieSchema
        .deleteOne(movie)
        .then(() => res.status(200).send({ message: 'Фильм успешно удален!' }));
    })
    .catch(next);
};
