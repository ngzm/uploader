const sqlite3 = require('sqlite3');

const DBFILEPATH = 'data/db.uploader';

class UploadDao {
  constructor() {
    this.db = new sqlite3.Database(DBFILEPATH);
  }

  add(updata, onSuccess, onError) {
    this.db.serialize(() => {
      this.db.run('INSERT INTO upload_files (name, path, mime, size) VALUES ($f, $p, $m, $s)',
        {
          $f: updata.name,
          $p: updata.path,
          $m: updata.mime,
          $s: updata.size,
        },
        (err) => {
          if (err) {
            console.log(`Error!! err = ${err}`);
            onError(err);
          } else {
            onSuccess();
          }
        });
    });
  }

  all(onSuccess, onError) {
    this.db.serialize(() => {
      this.db.all('SELECT id, name, path, mime, size, time FROM upload_files ORDER BY id',
        (err, rows) => {
          if (err) {
            console.log(`Error!! err = ${err}`);
            onError(err);
          } else {
            onSuccess(rows);
          }
        });
    });
  }

  get(id, onSuccess, onError) {
    this.db.serialize(() => {
      this.db.get('SELECT name, path, mime, size FROM upload_files WHERE id = $id',
        { $id: id },
        (err, row) => {
          if (err) {
            console.log(`Error!! err = ${err}`);
            onError(err);
          } else if (row === null || row === undefined) {
            console.log(`row = ${row}`);
            onError(new Error('Wrong ID number'));
          } else {
            onSuccess(row);
          }
        });
    });
  }

  del(id, onSuccess, onError) {
    this.db.serialize(() => {
      this.db.run('DELETE FROM upload_files WHERE id = $id', { $id: id }, (err) => {
        if (err) {
          console.log(`Error!! err = ${err}`);
          onError(err);
        } else {
          onSuccess();
        }
      });
    });
  }
}

module.exports = UploadDao;
