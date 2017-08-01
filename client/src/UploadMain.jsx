import React, { Component } from 'react';
import PropTypes from 'prop-types';

import UploadForm from './UploadForm';
import UploadList from './UploadList';
import UploadAjax from './UploadAjax';
import UploadHelper from './UploadHelper';
import Auth from './Authentication';
import './UploadMain.css';

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
      date: UploadHelper.getUtcDate(d.time),
    }));
    this.setState({ uppedfiles: upfiles });
  }

  setMessage(lev, mes) {
    this.setState({ message: { lev, mes } });
  }

  all() {
    UploadAjax.getAll((res) => {
      this.setUppedFiles(res.data);
    }, (err) => {
      this.setMessage(LV.ERR, `Get all Failed : ${err}`);
    });
  }

  upload(file) {
    UploadAjax.uploadFile(file, (res) => {
      this.setUppedFiles(res.data);
      this.setMessage(LV.INF, `${file.name} uploaded succcessfully`);
    }, (err) => {
      this.setMessage(LV.ERR, `${file.name} upload failed : ${err}`);
    });
  }

  download(file) {
    UploadAjax.downloadFile(file, () => {
      this.setMessage(LV.INF, `#${file.id} ${file.name} downloaded successfully`);
      //
      //
      //
      Auth.logout();
      this.props.onLogout();
    }, (err) => {
      this.setMessage(LV.ERR, `#${file.id} ${file.name} download failed : ${err}`);
    });
  }

  remove(file) {
    UploadAjax.removeFile(file, (res) => {
      this.setUppedFiles(res.data);
      this.setMessage(LV.INF, `#${file.id} ${file.name} removed succcessfully`);
    }, (err) => {
      this.setMessage(LV.ERR, `#${file.id} ${file.name} remove failed : ${err}`);
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

UploadMain.propTypes = { onLogout: PropTypes.func.isRequired };

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
