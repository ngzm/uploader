import React, { Component } from 'react';
import PropTypes from 'prop-types';

import UploadForm from './UploadForm';
import UploadList from './UploadList';
import './UploadMain.css';

import UploadService from './logic/UploadService';
import utils from './lib/utils';

const LV = { INF: 0, ERR: 1 };
const DEFAULT_MES = 'Please try any operations ...';

class UploadMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uppedfiles: [],
      message: { lev: LV.INF, mes: DEFAULT_MES },
    };
  }

  componentWillMount() {
    this.all();
  }

  setUppedFiles(datas) {
    const upfiles = datas.map(d => ({
      id: d.id,
      name: d.name,
      size: d.size,
      date: utils.getUtcDate(d.time),
    }));
    this.setState({ uppedfiles: upfiles });
  }

  setMessage(lev, mes) {
    this.setState({ message: { lev, mes } });
  }

  all() {
    UploadService.getAll((res) => {
      this.setUppedFiles(res.data);
    }, (err) => {
      this.setMessage(
        LV.ERR,
        `Get all Failed : ${UploadService.getEmes(err)}`,
      );
    });
  }

  upload(file) {
    UploadService.uploadFile(file, (res) => {
      this.setUppedFiles(res.data);
      this.setMessage(LV.INF, `${file.name} uploaded succcessfully`);
    }, (err) => {
      this.setMessage(
        LV.ERR,
        `${file.name} upload failed : ${UploadService.getEmes(err)}`,
      );
    });
  }

  download(file) {
    UploadService.downloadFile(file, () => {
      this.setMessage(LV.INF, `#${file.id} ${file.name} downloaded successfully`);
    }, (err) => {
      this.setMessage(
        LV.ERR,
        `#${file.id} ${file.name} download failed : ${UploadService.getEmes(err)}`,
      );
    });
  }

  remove(file) {
    UploadService.removeFile(file, (res) => {
      this.setUppedFiles(res.data);
      this.setMessage(LV.INF, `#${file.id} ${file.name} removed succcessfully`);
    }, (err) => {
      this.setMessage(
        LV.ERR,
        `#${file.id} ${file.name} remove failed : ${UploadService.getEmes(err)}`,
      );
    });
  }

  render() {
    return (
      <div>
        <UploadMessage message={this.state.message} />
        <UploadForm onUpload={(f) => { this.upload(f); }} />
        <UploadList
          uppedfiles={this.state.uppedfiles}
          onDownload={(f) => { this.download(f); }}
          onRemove={(f) => { this.remove(f); }}
        />
      </div>
    );
  }
}

function UploadMessage(props) {
  const mesClass = (props.message.lev === LV.ERR) ? 'error' : 'info';
  return (
    <section className="mainMsg">
      <div className={mesClass}>{props.message.mes}</div>
    </section>
  );
}

UploadMessage.propTypes = {
  message: PropTypes.shape({
    lev: PropTypes.number.isRequired,
    mes: PropTypes.string.isRequired,
  }).isRequired,
};

export default UploadMain;
