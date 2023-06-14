const movieSchema = require('../models/movie');
const BAD_REQUEST = require('../errors/BAD_REQUEST');
const NOT_FOUND = require('../errors/NOT_FOUND');
const FORBIDDEN_ERROR = require('../errors/FORBIDDEN_ERROR');

module.exports.getMovies = (req, res, next) => {
  movieSchema
    .find({})
    .then((movies) => res.status(200).send(movies))
    .catch(next);
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

module.exports.addLike = (req, res, next) => {
  movieSchema
    .findByIdAndUpdate(
      req.params.movieId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
    .then((movie) => {
      if (!movie) {
        return next(new NOT_FOUND('Фильм c данным _id не найден.'));
      }

      return res.status(200).send(movie);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(
          new BAD_REQUEST('Для установки лайка переданы некорректные данные.'),
        );
      }

      return next(err);
    });
};

module.exports.deleteLike = (req, res, next) => {
  movieSchema
    .findByIdAndUpdate(
      req.params.movieId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
    .then((movie) => {
      if (!movie) {
        return next(new NOT_FOUND('Фильм c данным _id не найден.'));
      }
      return res.status(200).send(movie);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(
          new BAD_REQUEST("Для удаления 'лайка' переданы некорректные данные."),
        );
      }
      return next(err);
    });
};
