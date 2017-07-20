const uploadDao = require('uploaddao');

const uploadLogic = {
  add: (updata, onSuccess, onError) => {
    // Validation Check
    // checkData(updata);

    // add updata info to db
    uploadDao.add(updata, onSuccess, onError);
  },
  all: (onSuccess, onError) => {
    // list all upload datas
    uploadDao.add(onSuccess, onError);
  },
  get: (id, onSuccess, onError) => {
    if (id.match(/\D/)) {
      throw new Error('Bad reuest on ID');
    }
    // get upload data what is matched by id
    uploadDao.get(id, onSuccess, onError);
  },
  delete: (id, onSuccess, onError) => {
    if (id.match(/\D/)) {
      throw new Error('Bad reuest on ID');
    }
    // delete upload data what is matched by id
    uploadDao.delete(id, onSuccess, onError);
  },
};
module.exports = uploadLogic;
