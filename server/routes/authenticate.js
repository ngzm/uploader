const logger = require('../logic/logger');
const LoginService = require('../logic/login_service');

const lservice = new LoginService();

/**
 * authentication
 */
module.exports = (req, res, next) => {
  const authorization = req.headers.authorization;
  logger.debug(`authorization = ${authorization}`);

  lservice.verify(authorization, () => {
    next();
  }, (err) => {
    logger.debug(`err = ${JSON.stringify(err)}`);
    next(err);
  });
};
