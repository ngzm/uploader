import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './UploadForm.css';

class UploadForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileObj: null,
      fileNam: 'Select File ..',
    };
  }

  changeFile(evt) {
    console.dir(evt.target);

    if (evt.target.files.length > 0) {
      console.dir(evt.target.files[0]);

      this.setState({
        fileObj: evt.target.files[0],
        fileNam: evt.target.files[0].name,
      });
    }
  }

  selectFile() {
    this.fileInput.click();
  }

  uploadFile() {
    this.props.onUpload(this.state.fileObj);
    this.setState({
      fileObj: null,
      fileNam: 'Select File ..',
    });
  }

  render() {
    return (
      <section className="upform">
        <button className="select" type="button" onClick={() => { this.selectFile(); }}>
          File
        </button>
        <input
          className="fileName"
          type="text"
          readOnly
          value={this.state.fileNam}
          onClick={() => { this.selectFile(); }}
        />
        <input
          className="nodisp"
          id="upfile"
          name="upfile"
          type="file"
          ref={(input) => { this.fileInput = input; }}
          onChange={(e) => { this.changeFile(e); }}
        />
        <button className="send" type="button" onClick={() => { this.uploadFile(); }}>
          SEND
        </button>
      </section>
    );
  }
}

UploadForm.propTypes = { onUpload: PropTypes.func.isRequired };

export default UploadForm;
