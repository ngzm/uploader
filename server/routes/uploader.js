const express = require('express');
const multer = require('multer');

const logger = require('../logic/logger');
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
  logger.debug(`updata = ${updata}`);

  uplogic.add(updata, (rpy) => {
    logger.debug(`rpy = ${rpy}`);
    res.send(rpy);
  }, (err) => {
    logger.debug(`err = ${err}`);
    next(err);
  });
});

router.get('/all', (req, res, next) => {
  uplogic.all((upfiles) => {
    logger.debug(`upfiles = ${upfiles}`);
    res.json(upfiles);
  }, (err) => {
    logger.debug(`err = ${err}`);
    next(err);
  });
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  uplogic.get(id, (upfile) => {
    logger.debug(`upfile = ${upfile}`);
    res.download(upfile.path, upfile.name);
  }, (err) => {
    logger.debug(`err = ${err}`);
    next(err);
  });
});

router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  uplogic.del(id, (rpy) => {
    logger.debug(`rpy = ${rpy}`);
    res.send(rpy);
  }, (err) => {
    logger.debug(`err = ${err}`);
    next(err);
  });
});

module.exports = router;
