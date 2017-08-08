const rsasign = require('jsrsasign');
const logger = require('./logger');

module.exports = {
  /**
   * Generate JWT Token
   */
  generate: (username) => {
    const APP = process.env.JWT_APP || 'your-app';
    const URI = process.env.JWT_URI || 'your-uri.net';
    const KEY = process.env.JWT_KEY || 'your-secure-key';

    // 有効期間24Hとする
    const start = rsasign.jws.IntDate.get('now');
    const end = start + (24 * 60 * 60);

    // JWTを識別するユニークなIDを生成
    const jwtid = rsasign.crypto.Util.sha256(start.toString() + username);

    logger.debug(`generate username = ${username}`);
    logger.debug(`generate APP = ${APP}`);
    logger.debug(`generate URI = ${URI}`);
    logger.debug(`generate KEY = ${KEY}`);
    logger.debug(`generate start = ${start}`);
    logger.debug(`generate end = ${end}`);
    logger.debug(`generate jwtid = ${jwtid}`);

    // Header
    const jwtHeader = { alg: 'HS256', typ: 'JWT' };

    // Claim
    const jwtClaim = {
      iss: APP,
      sub: username,
      nbf: start,
      iat: start,
      exp: end,
      jti: jwtid,
      aud: URI,
    };

    // Sign JWT
    const jwt = rsasign.jws.JWS.sign(
      'HS256',
      JSON.stringify(jwtHeader),
      JSON.stringify(jwtClaim),
      { utf8: KEY },
    );
    logger.debug(`generate jwt = ${jwt}`);

    return jwt;
  },
  /**
   * Verify JWT Token
   */
  verify: (jwt) => {
    const KEY = process.env.JWT_KEY || 'your-secure-key';
    logger.debug(`verify KEY = ${KEY}`);

    let isValid = false;
    if (jwt) {
      try {
        isValid = rsasign.jws.JWS.verifyJWT(
          jwt,
          { utf8: KEY },
          { alg: ['HS256'] },
        );
      } catch (e) {
        logger.debug(`verify exception = ${e}`);
        isValid = false;
      }
    }
    return isValid;
  },
  /**
   * Get username from JWT Token
   */
  getUsername: (jwt) => {
    const claim = rsasign.jws.JWS.readSafeJSONString(rsasign.b64utoutf8(jwt.split('.')[1]));
    return (claim && claim.sub) ? claim.sub : null;
  },
};
