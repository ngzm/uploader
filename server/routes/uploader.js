const express = require('express');
const multer = require('multer');
const logger = require('../logic/logger');
const UploadService = require('../logic/upload_service');

const router = express.Router();
const upservice = new UploadService();
const upload = multer({ dest: 'data/uploads/' });

/**
 * File Upload
 */
router.post('/', upload.single('upfile'), (req, res, next) => {
  const updata = {
    path: req.file.path,
    name: req.file.originalname,
    mime: req.file.mimetype,
    size: req.file.size,
  };
  logger.debug(`updata = ${updata}`);

  upservice.add(updata, (rpy) => {
    logger.debug(`rpy = ${rpy}`);
    res.send(rpy);
  }, (err) => {
    logger.debug(`err = ${err}`);
    next(err);
  });
});

/**
 * List all upload data
 */
router.get('/all', (req, res, next) => {
  upservice.all((upfiles) => {
    logger.debug(`upfiles = ${upfiles}`);
    res.json(upfiles);
  }, (err) => {
    logger.debug(`err = ${err}`);
    next(err);
  });
});

/**
 * Get specified upload data
 */
router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  upservice.get(id, (upfile) => {
    logger.debug(`upfile = ${upfile}`);
    res.download(upfile.path, upfile.name);
  }, (err) => {
    logger.debug(`err = ${err}`);
    next(err);
  });
});

/**
 * Delete specified upload data
 */
router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  upservice.del(id, (rpy) => {
    logger.debug(`rpy = ${rpy}`);
    res.send(rpy);
  }, (err) => {
    logger.debug(`err = ${err}`);
    next(err);
  });
});

module.exports = router;
