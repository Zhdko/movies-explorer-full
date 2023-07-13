const ConflictError = require('../Errors/ConflictError');
const NotFoundError = require('../Errors/NotFoundError');
const Movie = require('../models/movie');
const {
  MOVIE_NOT_FOUND,
  FORBIDDEN_DELETE_MOVIE,
} = require('../utils/constants');

const getAllMovies = (req, res, next) => {
  const owner = req.user._id;

  Movie.find({ owner })
    .then((result) => {
      res.send(result);
    })
    .catch(() => {
      throw new NotFoundError(MOVIE_NOT_FOUND);
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  const movieOwner = req.user;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner: movieOwner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => {
      movie
        .populate('owner')
        .then((movieInfo) => res.status(201).send(movieInfo))
        .catch(next);
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => next(new NotFoundError(MOVIE_NOT_FOUND)))
    .then((movie) => {
      if (req.user._id !== movie.owner.toString()) {
        throw new ConflictError(FORBIDDEN_DELETE_MOVIE);
      }
      movie
        .deleteOne()
        .then(() => res.send(movie))
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  getAllMovies,
  createMovie,
  deleteMovie,
};
