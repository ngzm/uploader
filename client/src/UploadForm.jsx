import React, { Component } from 'react';
import './UploadForm.css';

class UploadForm extends Component {
  constructor(props) {
    super(props);
    this.state = { file: null };
  }

  changeFile(evt) {
    console.dir(evt.target);
    console.dir(evt.target.files[0]);

    this.setState({ file: evt.target.files[0] });
  }
  selectFile() {
    this.fileInput.click();
  }

  render() {
    const fname = (this.state.file) ? this.state.file.name : 'select file';

    return (
      <div className="uploadFile">
        <input type="text" defalutValue="select file" value={fname} />
        <input
          className="nodisp"
          id="upfile"
          name="upfile"
          type="file"
          ref={(input) => { this.fileInput = input; }}
          onChange={(e) => { this.changeFile(e); }}
        />
        <button onClick={() => { this.selectFile(); }}>SELECT FILE</button>
      </div>
    );
  }
}

export default UploadForm;
