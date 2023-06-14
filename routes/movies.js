const movieRoutes = require('express').Router();

const {
  getMovies,
  createMovie,
  deleteMovie,
  // addLike,
  // deleteLike,
} = require('../controllers/movies');

const {
  validationCreateMovie,
  validationMovieById,
} = require('../middlewares/validations');

movieRoutes.get('/', getMovies);
movieRoutes.post('/', validationCreateMovie, createMovie);
// movieRoutes.delete('/_Id', validationMovieById, deleteMovie);
movieRoutes.delete('/:movieId', validationMovieById, deleteMovie);
// movieRoutes.put('/:movieId/likes', validationMovieById, addLike);
// movieRoutes.delete('/:movieId/likes', validationMovieById, deleteLike);

module.exports = movieRoutes;
