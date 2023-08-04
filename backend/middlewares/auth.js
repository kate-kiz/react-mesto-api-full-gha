const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const {
  messageError,
} = require('../errors/errors');

const { JWT_SECRET = 'test-secret' } = process.env;
const BEARER_PREFIX = 'Bearer ';

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith(BEARER_PREFIX)) {
    next(new UnauthorizedError(messageError.UnauthorizedError));
  }

  const token = authorization.replace(BEARER_PREFIX, '');

  let payload;
  try {
    // TODO: create production and dev .env files?
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new UnauthorizedError(messageError.UnauthorizedError));
  }

  req.user = payload;
  return next();

  // try {
  //   payload = jwt.verify(token, JWT_SECRET);
  //   req.user = payload;
  //   next();
  // } catch (error) {
  //   console.log('catch');
  //   next(new UnauthorizedError(messageError.UnauthorizedError));
  // }
};

module.exports = {
  auth,
};
