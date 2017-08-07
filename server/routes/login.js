const express = require('express');
const logger = require('../logic/logger');
const LoginService = require('../logic/login_service');

const router = express.Router();
const lservice = new LoginService();

/**
 * login
 */
router.post('/', (req, res, next) => {
  const loginReq = req.body || {};
  logger.debug(`loginReq = ${JSON.stringify(loginReq)}`);

  lservice.auth(loginReq, (rpy) => {
    logger.debug(`rpy = ${JSON.stringify(rpy)}`);
    res.status(200).json(rpy);
  }, (err) => {
    logger.debug(`err = ${JSON.stringify(err)}`);
    next(err);
  });
});

module.exports = router;
