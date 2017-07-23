const DbCtl = require('./dbctl_sqlite3');

class UploadDao extends DbCtl {
  add(updata, success, fail) {
    this.db.run('INSERT INTO upload_files (name, path, mime, size) VALUES ($f, $p, $m, $s)',
      {
        $f: updata.name,
        $p: updata.path,
        $m: updata.mime,
        $s: updata.size,
      },
      (err) => {
        if (err) {
          fail(err);
        } else {
          success('OK');
        }
      });
  }

  all(success, fail) {
    this.db.all('SELECT id, name, path, mime, size, time FROM upload_files ORDER BY id',
      (err, rows) => {
        if (err) {
          fail(err);
        } else {
          success(rows);
        }
      });
  }

  get(id, success, fail) {
    this.db.get('SELECT name, path, mime, size FROM upload_files WHERE id = $id',
      { $id: id },
      (err, row) => {
        if (err) {
          fail(err);
        } else {
          success(row);
        }
      });
  }

  del(id, success, fail) {
    this.db.run('DELETE FROM upload_files WHERE id = $id', { $id: id }, (err) => {
      if (err) {
        fail(err);
      } else {
        success('OK');
      }
    });
  }
}

module.exports = UploadDao;
