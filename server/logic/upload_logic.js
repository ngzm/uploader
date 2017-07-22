const UploadDao = require('./upload_dao');

/**
 * Validation Checkers
 * private only
 */
const privateUtils = {
  validateData: (updata) => {
    if (!updata.path) { return false; }
    if (!updata.name) { return false; }
    if (!updata.mime) { return false; }
    if (!updata.size) { return false; }
    return true;
  },
  validateId: (id) => {
    if (!id || id.match(/\D/)) { return false; }
    return true;
  },
};

/**
 * Handle upload file info on database
 */
class UploadLogic {
  /**
   * Constructor
   */
  constructor() {
    this.dao = new UploadDao();
  }

  /**
   * Add upload file info to the dabatase
   */
  add(updata, success, fail) {
    if (!privateUtils.validateData(updata)) {
      throw new Error('Bad reuest Upload Data');
    }
    this.dao.dbaccess(() => {
      new Promise((resolve, reject) => {
        this.dao.begin();
        this.dao.add(updata, resolve, reject);
      })
      .then((dat) => {
        this.dao.commit();
        success(dat);
      })
      .catch((err) => {
        this.dao.rollback();
        fail(err);
      });

      /**
       *
       * Promise Chain Sample
       *
      new Promise((resolve, reject) => {
        this.dao.add(updata, resolve, reject);
      })
      .then((dat1) => {
        console.log(`dat1 = ${dat1}`);
        return new Promise((resolve, reject) => {
          this.dao.all(resolve, reject);
        });
      })
      .then((dat2) => {
        console.log(`dat2 = ${dat2}`);
        return Promise.resolve();
      })
      .then(() => {
        this.dao.commit();
        success('OK');
      })
      .catch((err) => { this.dao.rollback(); error(err); });
      **/
    });
  }

  /**
   * Select all of upload file info
   */
  all(success, fail) {
    this.dao.dbaccess(() => {
      new Promise((resolve, reject) => {
        this.dao.begin();
        this.dao.all(resolve, reject);
      })
      .then((ups) => {
        const upfiles = [];
        if (ups) {
          ups.forEach((up) => {
            upfiles.push({
              id: up.id,
              name: up.name,
              path: up.path,
              mime: up.mime,
              size: up.size,
              time: up.time,
            });
          });
        }
        this.dao.commit();
        success(upfiles);
      })
      .catch((err) => {
        this.dao.rollback();
        fail(err);
      });
    });
  }

  /**
   * Select all of upload file info
   */
  get(id, success, fail) {
    if (!privateUtils.validateId(id)) {
      throw new Error('Bad reuest at ID');
    }
    this.dao.dbaccess(() => {
      new Promise((resolve, reject) => {
        this.dao.begin();
        this.dao.get(id, resolve, reject);
      })
      .then((up) => {
        if (!up) {
          throw new Error('No Mutch data');
        }
        const upfile = {
          id: up.id,
          name: up.name,
          path: up.path,
          mime: up.mime,
          size: up.size,
          time: up.time,
        };
        this.dao.commit();
        success(upfile);
      })
      .catch((err) => {
        this.dao.rollback();
        fail(err);
      });
    });
  }

  /**
   * Select all of upload file info
   */
  del(id, success, fail) {
    if (!privateUtils.validateId(id)) {
      throw new Error('Bad reuest at ID');
    }
    this.dao.dbaccess(() => {
      new Promise((resolve, reject) => {
        this.dao.begin();
        this.dao.del(id, resolve, reject);
      })
      .then((dat) => {
        this.dao.commit();
        success(dat);
      })
      .catch((err) => {
        this.dao.rollback();
        fail(err);
      });
    });
  }
}

module.exports = UploadLogic;
