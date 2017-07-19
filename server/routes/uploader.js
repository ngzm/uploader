const express = require('express');
const multer = require('multer');
const sqlite3 = require('sqlite3');

const router = express.Router();
const upload = multer({ dest: 'data/uploads/' });
const db = new sqlite3.Database('data/db.uploader');

router.post('/', upload.single('testfile'), (req, res) => {
  const path = req.file.path;
  const filename = req.file.originalname;
  const mimetype = req.file.mimetype;
  const size = req.file.size;

  console.log(req.file);

  db.serialize(() => {
    db.run('INSERT INTO upload_files ' +
            '(filename, path, mimetype, size) ' +
            'VALUES ($f, $p, $m, $s)',
      {
        $f: filename,
        $p: path,
        $m: mimetype,
        $s: size,
      },
    );
  });
  res.send('OK');
});

router.get('/list', (req, res, next) => {
  db.serialize(() => {
    db.all('SELECT filename, mimetype, size, time FROM upload_files',
      (err, rows) => {
        if (err) {
          console.log(`Error!! err = ${err}`);
          next(err);
        }

        const uploads = [];
        rows.forEach((row) => {
          uploads.push({
            filename: row.filename,
            path: row.path,
            mimetype: row.mimetype,
            size: row.size,
            time: row.time,
          });
        });
        res.json(uploads);
      });
  });
});

module.exports = router;
