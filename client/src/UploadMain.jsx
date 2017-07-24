import React, { Component } from 'react';
import UploadForm from './UploadForm';
// import './Upload.css';

class UploadMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'ngzmup',
      file: null,
    };
  }

  render() {
    return (
      <div>
        <UploadForm />
        {/* <UploaList /> */}
      </div>
    );
  }
}

export default UploadMain;
