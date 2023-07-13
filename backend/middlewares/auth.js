const jwt = require('jsonwebtoken');
const AuthorizationError = require('../Errors/AuthorizationError');
const { NOT_AUTHORIZATION } = require('../utils/constants');
const { SECRET_KEY } = require('../utils/config');
require('dotenv').config();

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next(new AuthorizationError(NOT_AUTHORIZATION));
  }

  let payload;
  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return next(new AuthorizationError(NOT_AUTHORIZATION));
  }

  req.user = payload;

  return next();
};
