import { BEAT_FILM_MOVIE_API } from './constants';

export class MovieApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponce(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getMovies() {
    return fetch(BEAT_FILM_MOVIE_API, {
      method: 'GET',
      headers: this._headers,
    }).then((res) => this._checkResponce(res));
  }
}

const movieApi = new MovieApi({
  baseUrl: BEAT_FILM_MOVIE_API,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default movieApi;
