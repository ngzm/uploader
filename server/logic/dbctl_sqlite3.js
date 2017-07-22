const sqlite3 = require('sqlite3');

class DbCtl {
  constructor() {
    this.db = new sqlite3.Database('data/db.uploader');
    console.log('db conected !!');
  }

  disconnect() {
    this.db.close();
    console.log('db disconnected!');
  }

  dbaccess(procs) {
    this.db.serialize(() => {
      procs();
    });
  }

  begin() {
    this.db.exec('BEGIN TRANSACTION');
    console.log('Transaction Began!');
  }

  commit() {
    this.db.exec('COMMIT');
    console.log('Transaction Committed!');
  }

  rollback() {
    this.db.exec('ROLLBACK');
    console.log('Transacrion rollbacked!');
  }
}

module.exports = DbCtl;
