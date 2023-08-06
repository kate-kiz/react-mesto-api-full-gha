const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { messageError } = require('../errors/errors');
const { JWT_SECRET, NODE_ENV } = process.env;

const BEARER_PREFIX = 'Bearer ';

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith(BEARER_PREFIX)) {
    next(new UnauthorizedError(messageError.UnauthorizedError));
  }

  const token = authorization.replace(BEARER_PREFIX, '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
    console.log('into auth try');
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
