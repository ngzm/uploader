const express = require('express');
const multer = require('multer');
const sqlite3 = require('sqlite3');

const router = express.Router();
const upload = multer({ dest: 'data/uploads/' });
const db = new sqlite3.Database('data/db.uploader');

router.post('/', upload.single('testfile'), (req, res) => {
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
    );
  });
  res.send('OK');
});

router.get('/all', (req, res, next) => {
  db.serialize(() => {
    db.all('SELECT id, name, path, mime, size, time FROM upload_files ORDER BY id',
      (err, rows) => {
        if (err) {
          console.log(`Error!! err = ${err}`);
          next(err);
        }

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
      });
  });
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;

  db.serialize(() => {
    db.get('SELECT name, path, mime, size FROM upload_files WHERE id = $id', { $id: id },
      (err, row) => {
        if (err) {
          console.log(`Error!! err = ${err}`);
          next(err);
        }
        res.download(row.path, row.name);
      });
  });
});
module.exports = router;
