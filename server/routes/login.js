const express = require('express');
const logger = require('../logic/logger');
const AuthenticateService = require('../logic/authenticate_service');

const router = express.Router();
const aservice = new AuthenticateService();

/**
 * login
 */
router.post('/', (req, res, next) => {
  const loginReq = req.body || {};
  logger.debug(`loginReq = ${JSON.stringify(loginReq)}`);

  aservice.auth(loginReq, (rpy) => {
    logger.debug(`rpy = ${JSON.stringify(rpy)}`);
    res.status(200).json(rpy);
  }, (err) => {
    logger.debug(`err = ${JSON.stringify(err)}`);
    next(err);
  });
});

module.exports = router;
