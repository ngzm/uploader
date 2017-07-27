import React, { Component } from 'react';
import Axios from 'axios';
import UploadForm from './UploadForm';
import UploadList from './UploadList';

class UploadMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uppedfiles: [
        { id: 1, name: 'aaa.png', size: 100, date: new Date() },
        { id: 2, name: 'bbb.png', size: 200, date: new Date() },
        { id: 3, name: 'ccc.png', size: 300, date: new Date() },
        { id: 4, name: 'ddd.png', size: 400, date: new Date() },
        { id: 5, name: 'eee.png', size: 500, date: new Date() },
      ],
    };
  }

  upload(fileObj) {
    const formdata = new FormData();
    formdata.append('upfile', fileObj);

    Axios.post('/upload', formdata)
    .then((res) => {
      console.dir(res);

      this.setState({
        uppedfiles: [
          { id: 1, name: 'aaa.png', size: 100, date: new Date() },
          { id: 2, name: 'bbb.png', size: 200, date: new Date() },
          { id: 3, name: 'ccc.png', size: 300, date: new Date() },
          { id: 4, name: 'ddd.png', size: 400, date: new Date() },
          { id: 5, name: 'eee.png', size: 500, date: new Date() },
          { id: 6, name: 'fff.png', size: 600, date: new Date() },
          { id: 7, name: 'ggg.png', size: 700, date: new Date() },
          { id: 8, name: 'hhh.png', size: 800, date: new Date() },
        ],
      });
    }).catch((res) => {
      console.dir(res);
    });
  }

  render() {
    return (
      <div>
        <UploadForm onUpload={(f) => { this.upload(f); }} />
        <UploadList uppedfiles={this.state.uppedfiles} />
      </div>
    );
  }
}

export default UploadMain;
