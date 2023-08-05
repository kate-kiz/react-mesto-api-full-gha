const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { messageError } = require('../errors/errors');
// const { handleErrors } = require('../errors/errors');

const { JWT_SECRET, NODE_ENV } = process.env;

const getUsers = (req, res, next) => {
  User.find({})
    // .then((results) => res.status(codeSuccess.OK).send({ data: results }))
    .then((results) => res.send({ data: results }))
    .catch((error) => next(error));
};

const getUserById = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(messageError.notFoundError);
      } else {
        res.send({ data: user });
      }
    })
    .catch((error) => next(error));
};

const getUserInfo = (req, res, next) => {
  console.log('1');
  const id = req.user._id;
  User.findById(id)
    .then((user) => {
      if (!user) {
        console.log('not found');
        throw new NotFoundError(messageError.notFoundError);
      } else {
        console.log('answer');
        res.send(user);
      }
    })
    .catch((error) => {
      console.log('error');
      next(error);
    });
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.send({
      name: user.name, about: user.about, avatar: user.avatar, email: user.email,
    }))
    .catch((error) => next(error));
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(messageError.UnauthorizedError);
      }
      bcrypt.compare(password, user.password)
        .then((isValidUser) => {
          if (isValidUser) {
            const token = jwt.sign(
              { _id: user._id },
              NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
              { expiresIn: '7d' },
            );
            console.log(token);
            res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true, sameSite: true })
              .send({ token });
          } else {
            throw new UnauthorizedError(messageError.UnauthorizedError);
          }
        }).catch((error) => next(error));
    }).catch((error) => next(error));
};

const updateAvatar = (req, res, next) => {
  const userId = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(messageError.notFoundError);
      } else {
        res.send({ data: user });
      }
    })
    .catch((error) => next(error));
};

const updateProfile = (req, res, next) => {
  const userId = req.user._id;
  const { name, about } = req.body;
  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(messageError.notFoundError);
      } else {
        res.send({ data: user });
      }
    })
    .catch((error) => next(error));
};

module.exports = {
  getUsers, createUser, getUserById, getUserInfo, updateAvatar, updateProfile, login,
};
