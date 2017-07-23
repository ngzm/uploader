const helper = require('./upload_service_helper');
const logger = require('./logger');
const UploadDao = require('./upload_dao');

/**
 * Handle upload file info on database
 */
class UploadSerice {
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
    if (!helper.validator.validateData(updata)) {
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
    if (!helper.validator.validateId(id)) {
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
    if (!helper.validator.validateId(id)) {
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
        return up.path;
      })
      .then((path) => {
        logger.debug(`path = ${path}`);
        helper.foperator.remove(path);

        return new Promise((resolve, reject) => {
          this.dao.del(id, resolve, reject);
        });
      })
      .then((dat) => {
        logger.debug(`dat = ${dat}`);
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

module.exports = UploadSerice;
