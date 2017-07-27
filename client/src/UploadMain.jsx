import React, { Component } from 'react';
import Axios from 'axios';
import UploadForm from './UploadForm';
import UploadList from './UploadList';

class UploadMain extends Component {
  static getAll() {
    return Axios.get('/upload/all');
  }

  static postFile(file) {
    const formData = new FormData();
    formData.append('upfile', file);
    return Axios.post('/upload', formData);
  }

  static setUppedFiles(datas) {
    return datas.map(d => (
      { id: d.id, name: d.name, size: d.size, date: UploadMain.getUtcDate(d.time) }
    ));
  }

  static getUtcDate(utcstring) {
    const loco = new Date(utcstring).getTime();
    const ofst = new Date().getTimezoneOffset() * 60 * 1000;
    return new Date(loco - ofst);
  }

  constructor(props) {
    super(props);
    this.state = {
      uppedfiles: [],
    };
  }

  upload(file) {
    UploadMain.postFile(file)
    .then((res) => {
      console.log('post result');
      console.dir(res);

      return UploadMain.getAll();
    })
    .then((res) => {
      console.log('get result');
      console.dir(res);

      this.setState({ uppedfiles: UploadMain.setUppedFiles(res.data) });
    })
    .catch((err) => {
      console.dir(err);
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
