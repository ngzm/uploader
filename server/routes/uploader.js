const express = require('express');
const multer = require('multer');
const UploadLogic = require('../logic/upload_logic');

const router = express.Router();
const upload = multer({ dest: 'data/uploads/' });
const uplogic = new UploadLogic();

router.post('/', upload.single('testfile'), (req, res, next) => {
  const updata = {
    path: req.file.path,
    name: req.file.originalname,
    mime: req.file.mimetype,
    size: req.file.size,
  };
  console.log(updata);
  uplogic.add(updata, (rpy) => {
    console.log(rpy);
    res.send(rpy);
  }, (err) => {
    console.log(`err = ${err}`);
    next(err);
  });
});

router.get('/all', (req, res, next) => {
  uplogic.all((upfiles) => {
    console.log(upfiles);
    res.json(upfiles);
  }, (err) => {
    console.log(`err = ${err}`);
    next(err);
  });
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  uplogic.get(id, (upfile) => {
    console.log(upfile);
    res.download(upfile.path, upfile.name);
  }, (err) => {
    console.log(`err = ${err}`);
    next(err);
  });
});

router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  uplogic.del(id, (rpy) => {
    console.log(rpy);
    res.send(rpy);
  }, (err) => {
    console.log(`err = ${err}`);
    next(err);
  });
});

module.exports = router;
