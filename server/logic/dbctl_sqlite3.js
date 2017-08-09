const sqlite3 = require('sqlite3');
const path = require('path');
const logger = require('./logger');

class DbCtl {
  constructor() {
    this.db = new sqlite3.Database(path.join(__dirname, '..', '..', 'data', 'db.uploader'));
    logger.info('db conected !!');
  }

  disconnect() {
    this.db.close();
    logger.info('db disconnected!');
  }

  dbaccess(procs) {
    this.db.serialize(() => {
      procs();
    });
  }

  begin() {
    this.db.exec('BEGIN TRANSACTION');
    logger.debug('Transaction Began!');
  }

  commit() {
    this.db.exec('COMMIT');
    logger.debug('Transaction Committed!');
  }

  rollback() {
    this.db.exec('ROLLBACK');
    logger.debug('Transacrion rollbacked!');
  }
}

module.exports = DbCtl;
