import React, { Component } from 'react';
import UploadForm from './UploadForm';
import UploadList from './UploadList';

class UploadMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'ngzmup',
      file: null,
      upfiles: [
        { id: 1, name: 'aaa.png', size: 100 },
        { id: 2, name: 'bbb.png', size: 200 },
        { id: 3, name: 'ccc.png', size: 300 },
        { id: 4, name: 'ddd.png', size: 400 },
        { id: 5, name: 'eee.png', size: 500 },
        { id: 6, name: 'fff.png', size: 600 },
        { id: 7, name: 'ggg.png', size: 700 },
        { id: 8, name: 'hhh.png', size: 800 },
      ],
    };
  }

  render() {
    return (
      <div>
        <UploadForm />
        <UploadList upfiles={this.state.upfiles} />
      </div>
    );
  }
}

export default UploadMain;
