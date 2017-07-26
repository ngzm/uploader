import React, { Component } from 'react';
import UploadForm from './UploadForm';
import UploadList from './UploadList';

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
        <UploadList />
      </div>
    );
  }
}

export default UploadMain;
