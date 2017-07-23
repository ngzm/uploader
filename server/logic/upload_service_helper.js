const fs = require('fs');

/**
 * Validation Checkers
 */
module.exports.validator = {
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
 * File Operators
 */
module.exports.foperator = {
  remove: (path) => {
    if (fs.statSync(path)) {
      fs.unlinkSync(path);
    }
  },
};
