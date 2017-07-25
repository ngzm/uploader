import React, { Component } from 'react';
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
        <button className="send" type="button" onClick={() => { this.selectFile(); }}>
          SEND
        </button>
      </section>
    );
  }
}

export default UploadForm;
