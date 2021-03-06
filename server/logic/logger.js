const winston = require('winston');
const path = require('path');

module.exports = new winston.Logger({
  level: 'debug',
  transports: [
    new (winston.transports.File)({
      filename: path.join(__dirname, '..', '..', 'data', 'log', 'app.log'),
      json: true,
    }),
  ],
});
