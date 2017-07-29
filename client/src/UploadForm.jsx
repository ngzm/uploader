import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './UploadForm.css';

const DEFAULT_LABEL_MES = 'Select files ...';

class UploadForm extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedFiles: null };
  }

  changeFile(evt) {
    if (evt.target.files.length > 0) {
      this.setState({ selectedFiles: evt.target.files[0] });
      this.fileLabel.value = evt.target.files[0].name;
    }
  }

  selectFile() {
    this.fileInput.click();
  }

  uploadFile() {
    if (this.state.selectedFiles) {
      this.props.onUpload(this.state.selectedFiles);
      this.setState({ selectedFiles: null });
      this.fileLabel.value = DEFAULT_LABEL_MES;
    }
  }

  render() {
    return (
      <section className="upform">
        <button className="select" type="button" onClick={() => { this.selectFile(); }}>
          File
        </button>
        <input
          className="fileLabel"
          type="text"
          readOnly
          defaultValue={DEFAULT_LABEL_MES}
          ref={(elem) => { this.fileLabel = elem; }}
          onClick={() => { this.selectFile(); }}
        />
        <input
          className="nodisp"
          type="file"
          ref={(elem) => { this.fileInput = elem; }}
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
