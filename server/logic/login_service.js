const Jwt = require('./jwt');
const logger = require('../logic/logger');

class LoginService {
  constructor() {
    this.jwt = Jwt.jwt;
  }

  auth(userdata, success, fail) {
    // とりあえず簡易版の認証
    // あとでちゃんと作り直す
    const USER = process.env.UPLOAD_USER || 'your-username';
    const PSWD = process.env.UPLOAD_PASS || 'your-passwd';

    logger.debug(`username = ${userdata.username}`);
    logger.debug(`password = ${userdata.password}`);
    logger.debug(`USER = ${USER}`);
    logger.debug(`PSWD = ${PSWD}`);

    if (userdata.username === USER && userdata.password === PSWD) {
      const token = this.jwt.generate(userdata.username);
      success({ authtoken: token });
    } else {
      const err = new Error('Invalid username or password');
      err.status = 401;
      fail(err);
    }
  }
}

module.exports = LoginService;
