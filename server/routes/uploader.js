const express = require('express');
const multer = require('multer');
const sqlite3 = require('sqlite3');

const router = express.Router();
const upload = multer({ dest: 'data/uploads/' });
const db = new sqlite3.Database('data/db.uploader');

router.post('/', upload.single('testfile'), (req, res, next) => {
  const path = req.file.path;
  const name = req.file.originalname;
  const mime = req.file.mimetype;
  const size = req.file.size;

  console.log(req.file);

  db.serialize(() => {
    db.run('INSERT INTO upload_files (name, path, mime, size) VALUES ($f, $p, $m, $s)',
      {
        $f: name,
        $p: path,
        $m: mime,
        $s: size,
      },
      (err) => {
        if (err) {
          console.log(`Error!! err = ${err}`);
          next(err);
        } else {
          res.send('OK');
        }
      },
    );
  });
});

router.get('/all', (req, res, next) => {
  db.serialize(() => {
    db.all('SELECT id, name, path, mime, size, time FROM upload_files ORDER BY id',
      (err, rows) => {
        if (err) {
          console.log(`Error!! err = ${err}`);
          next(err);
        } else {
          const uploads = [];
          rows.forEach((row) => {
            uploads.push({
              id: row.id,
              name: row.name,
              path: row.path,
              mime: row.mime,
              size: row.size,
              time: row.time,
            });
          });
          res.json(uploads);
        }
      });
  });
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  if (id.match(/\D/)) {
    throw new Error('Bad reuest on ID');
  }
  db.serialize(() => {
    db.get('SELECT name, path, mime, size FROM upload_files WHERE id = $id', { $id: id },
      (err, row) => {
        if (err) {
          console.log(`Error!! err = ${err}`);
          next(err);
        } else if (row === null || row === undefined) {
          next(new Error('Wrong ID number'));
        } else {
          res.download(row.path, row.name);
        }
      });
  });
});

router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  if (id.match(/\D/)) {
    throw new Error('Bad reuest on ID');
  }
  db.serialize(() => {
    db.run('DELETE FROM upload_files WHERE id = $id', { $id: id }, (err) => {
      if (err) {
        console.log(`Error!! err = ${err}`);
        next(err);
      } else {
        res.send('OK');
      }
    });
  });
});

module.exports = router;
