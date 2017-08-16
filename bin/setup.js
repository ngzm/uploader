const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3');

/**
 * Initial Setup Routine
 */
module.exports = () => {
  const DAT_DIR = path.join(__dirname, '..', 'data');
  const UPD_DIR = path.join(DAT_DIR, 'uploads');
  const LOG_DIR = path.join(DAT_DIR, 'log');
  const DB_FILE = path.join(DAT_DIR, 'db.uploader');

  if (!fs.existsSync(DAT_DIR)) { fs.mkdirSync(DAT_DIR); }
  if (!fs.existsSync(UPD_DIR)) { fs.mkdirSync(UPD_DIR); }
  if (!fs.existsSync(LOG_DIR)) { fs.mkdirSync(LOG_DIR); }
  if (!fs.existsSync(DB_FILE)) {
    const db = new sqlite3.Database(DB_FILE);
    db.serialize(() => {
      db.run(
        'CREATE TABLE upload_files (' +
        ' id INTEGER PRIMARY KEY AUTOINCREMENT,' +
        ' name TEXT NOT NULL,' +
        ' path TEXT NOT NULL UNIQUE,' +
        ' mime TEXT,' +
        ' size INTEGER,' +
        ' time TIMESTAMP DEFAULT CURRENT_TIMESTAMP)',
        (err) => { if (err) { throw err; } },
      );
    });
    db.close();
  }
};
