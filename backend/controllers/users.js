require('dotenv').config();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const NotFoundError = require('../Errors/NotFoundError');
const User = require('../models/user');
const RegisterError = require('../Errors/RegisterError');
const RequestError = require('../Errors/RequestError');
const {
  BAD_REQUEST,
  WRONG_EMAIL,
  SUCCESSFUL_LOGOUT,
  USER_NOT_FOUND,
} = require('../utils/constants');
const { SECRET_KEY } = require('../utils/config');

const createUser = (req, res, next) => {
  const { email, password, name } = req.body;

  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      email,
      name,
      password: hash,
    })
      .then((user) => {
        res.status(201).send({
          email: user.email,
          name: user.name,
        });
      })
      .catch((err) => {
        if (err.code === 11000) {
          next(new RegisterError(WRONG_EMAIL));
        } else if (err instanceof mongoose.Error.ValidationError) {
          next(new RequestError(BAD_REQUEST));
        } else {
          next(err);
        }
      });
  });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user.id }, SECRET_KEY, { expiresIn: '7d' });
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          sameSite: 'none',
          httpOnly: true,
          secure: true,
        })
        .send({ token });
    })
    .catch(next);
};

const logout = (req, res) => {
  res.clearCookie('jwt');
  res.status(200).send({ message: SUCCESSFUL_LOGOUT });
  res.end();
};

const findUser = (req, res, next) => {
  const id = req.user._id;
  User.findById(id)
    .orFail(() => next(new NotFoundError(USER_NOT_FOUND)))
    .then((user) => res.send(user))
    .catch(next);
};

const findAndUpdate = (req, res, next) => {
  const id = req.user._id;
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    id,
    { name, email },
    { new: true, runValidators: true },
  )
    .orFail(() => next(new NotFoundError(USER_NOT_FOUND)))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.code === 11000) {
        next(new RegisterError(WRONG_EMAIL));
      }
      next(err);
    });
};

module.exports = {
  findUser,
  findAndUpdate,
  createUser,
  login,
  logout,
};
