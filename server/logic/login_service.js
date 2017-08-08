const jsonwt = require('./jwt');
const logger = require('../logic/logger');

class LoginService {
  constructor() {
    this.jwt = jsonwt;
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

  verify(authorization, success, fail) {
    logger.debug(`verify authorization = ${authorization}`);

    if (authorization && typeof authorization === 'string') {
      const dat = authorization.match(/^Bearer ([^ ]+)$/);
      logger.debug(`dat = ${dat}`);
      logger.debug(`dat length = ${dat.length}`);
      logger.debug(`dat length[1] = ${dat[1]}`);

      if (dat && dat.length > 1) {
        const token = dat[1];
        logger.debug(`token = ${token}`);

        if (this.jwt.verify(token)) {
          // JWT の Verify に成功 => 認証成功
          logger.debug('verify OK!!!');
          success();

          // 認証成功したのでリターン！！
          return;
        }
      }
    }
    // ここまで降りてきたものは認証に失敗している時だけ
    // 401エラーを返す
    const err = new Error('Unauthorized to access this uploader');
    err.status = 401;
    fail(err);
  }
}

module.exports = LoginService;
