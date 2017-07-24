import React, { Component } from 'react';
import './UploadForm.css';

class UploadForm extends Component {
  render() {
    return (
      <div className="upload_form">
        <form
          className="form-inline"
          encType="multipart/form-data"
          action="/upload"
          method="POST"
        >
          <div className="form-group">
            <label className="sr-only" htmlFor="upfile">Upload File</label>
            <input id="upfile" type="file" name="testfile" className="form-control" />
          </div>
          <button>Upload</button>
        </form>
      </div>
    );
  }
}

export default UploadForm;
