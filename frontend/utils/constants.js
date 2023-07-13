const urlRegExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/;

const BAD_REQUEST = 'Переданы неккоректные данные';
const WRONG_EMAIL = 'Email уже используется';
const SUCCESSFUL_LOGOUT = 'Успешный выход';
const USER_NOT_FOUND = 'Пользователь не найден';
const MOVIE_NOT_FOUND = 'Фильм не найден';
const FORBIDDEN_DELETE_MOVIE = 'Вы не можите удалить фильм другого пользователя';
const NOT_AUTHORIZATION = 'Необходима авторизация';
const SERVER_ERROR = 'Ошибка сервера';
const BAD_URL = 'Такого URL не существует';
const REQUIRED_ERROR = 'Поле {#label} является обязательным';
const MIN_LENGTH_ERROR = 'Поле {#label} не может содержать меньше {#limit} символов';
const MAX_LENGTH_ERROR = 'Поле {#label} не может содержать больше {#limit} символов';
const WRONG_EMAIL_PASSWORD = 'Неправильные почта или пароль';

module.exports = {
  WRONG_EMAIL_PASSWORD,
  MIN_LENGTH_ERROR,
  MAX_LENGTH_ERROR,
  REQUIRED_ERROR,
  BAD_URL,
  SERVER_ERROR,
  NOT_AUTHORIZATION,
  FORBIDDEN_DELETE_MOVIE,
  MOVIE_NOT_FOUND,
  USER_NOT_FOUND,
  SUCCESSFUL_LOGOUT,
  WRONG_EMAIL,
  BAD_REQUEST,
  urlRegExp,
};
