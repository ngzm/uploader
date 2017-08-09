const logger = require('../logic/logger');
const AuthenticateService = require('../logic/authenticate_service');

const aservice = new AuthenticateService();

/**
 * authentication
 */
module.exports = (req, res, next) => {
  const authorization = req.headers.authorization;
  logger.debug(`authorization = ${authorization}`);

  aservice.verify(authorization, () => {
    next();
  }, (err) => {
    logger.debug(`err = ${JSON.stringify(err)}`);
    next(err);
  });
};
