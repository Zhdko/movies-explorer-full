const { isCelebrateError } = require('celebrate');
const { SERVER_ERROR } = require('../utils/constants');

const errorsHandler = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    const errorBody = err.details.get('body');
    const {
      details: [errorDetails],
    } = errorBody;
    return res.status(400).json({
      message: errorDetails.message,
    });
  }
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? SERVER_ERROR : message,
  });
  return next();
};

module.exports = { errorsHandler };
