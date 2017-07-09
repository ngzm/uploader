const express = require('express');
const multer = require('multer');
const fs = require('fs');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('testfile'), (req, res, next) => {
  console.log(req.file);

  const tmppath = req.file.path;
  const tgtpath = `${tmppath}_${req.file.originalname}`;
  fs.rename(tmppath, tgtpath, (err) => {
    if (err) {
      console.log(err);
      next(err);
    } else {
      console.log('OK');
      res.send('OK');
    }
  });
});

module.exports = router;
