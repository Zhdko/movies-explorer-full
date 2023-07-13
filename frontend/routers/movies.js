const movieRouter = require('express').Router();
const {
  getAllMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const {
  validateCreateMovie,
  validateMovieId,
} = require('../middlewares/movieValidators');

movieRouter.get('/', getAllMovies);
movieRouter.post('/', validateCreateMovie, createMovie);
movieRouter.delete('/:movieId', validateMovieId, deleteMovie);

module.exports = { movieRouter };
