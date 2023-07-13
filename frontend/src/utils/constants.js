const { REACT_APP_BASE_URL, NODE_ENV } = process.env;

export const BASE_URL = NODE_ENV === 'development' ? 'http://localhost:3001' : REACT_APP_BASE_URL;
export const BEAT_FILM_MOVIE_API = 'https://api.nomoreparties.co/beatfilm-movies';

export const SCREEN_SM = 480;
export const SCREEN_MD = 768;

export const MOVIE_DURATION_HOUR = 60;
export const MOVIE_LENGTH_SM = 5;
export const MOVIE_LENGTH_MD = 7;
export const BEGINNING_OF_URL = 'https://api.nomoreparties.co';
