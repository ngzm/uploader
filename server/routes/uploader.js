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
  uplogic.add(updata, () => { res.send('OK'); }, (err) => { next(err); });
});

router.get('/all', (req, res, next) => {
  uplogic.all((rows) => {
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
  }, (err) => {
    next(err);
  });
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  uplogic.get(id, (row) => { res.download(row.path, row.name); }, (err) => { next(err); });
});

router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  uplogic.del(id, () => { res.send('OK'); }, (err) => { next(err); });
});

module.exports = router;
