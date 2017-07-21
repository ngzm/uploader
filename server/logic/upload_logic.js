const UploadDao = require('./upload_dao');

class UploadLogic {
  constructor() {
    this.dao = new UploadDao();
  }

  add(updata, onSuccess, onError) {
    // Validation Check
    // checkData(updata);

    // add updata info to db
    this.dao.add(updata, onSuccess, onError);
  }

  all(onSuccess, onError) {
    // list all upload datas
    this.dao.all(onSuccess, onError);
  }

  get(id, onSuccess, onError) {
    if (id.match(/\D/)) {
      throw new Error('Bad reuest on ID');
    }
    // get upload data what is matched by id
    this.dao.get(id, onSuccess, onError);
  }

  del(id, onSuccess, onError) {
    if (id.match(/\D/)) {
      throw new Error('Bad reuest on ID');
    }
    // delete upload data what is matched by id
    this.dao.del(id, onSuccess, onError);
  }
}

module.exports = UploadLogic;
