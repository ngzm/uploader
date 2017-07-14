const express = require('express');
const multer = require('multer');
const sqlite3 = require('sqlite3');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });
const db = new sqlite3.Database('sqlite/db.uploader');

router.post('/', upload.single('testfile'), (req, res) => {
  const path = req.file.path;
  const filename = req.file.originalname;
  const mimetype = req.file.mimetype;
  const size = req.file.size;

  console.log(req.file);

  db.serialize(() => {
    db.run('INSERT INTO upload_files (filename, path, mimetype, size) VALUES ($f, $p, $m, $s)',
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

module.exports = router;
