const movieRoutes = require('express').Router();

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

const {
  validationCreateMovie,
  validationMovieById,
} = require('../middlewares/validations');

movieRoutes.get('/', getMovies);
movieRoutes.post('/', validationCreateMovie, createMovie);
movieRoutes.delete('/:movieId', validationMovieById, deleteMovie);

module.exports = movieRoutes;
