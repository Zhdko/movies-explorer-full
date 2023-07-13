const userRouter = require('express').Router();
const { findUser, findAndUpdate } = require('../controllers/users');
const { validateUpdateUser } = require('../middlewares/userValidation');

userRouter.get('/me', findUser);
userRouter.patch('/me', validateUpdateUser, findAndUpdate);

module.exports = { userRouter };
