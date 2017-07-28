import React, { Component } from 'react';
import PropTypes from 'prop-types';

import UploadForm from './UploadForm';
import UploadList from './UploadList';
import UploadAjax from './UploadAjax';
import UploadHelper from './UploadHelper';

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
    UploadAjax.getAll()
    .then((res) => {
      this.setUppedFiles(res.data);
    })
    .catch((err) => {
      console.dir(err);
      this.setMessage(LV.ERR, err);
    });
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

  upload(file) {
    UploadAjax.postFile(file)
    .then(() => UploadAjax.getAll())
    .then((res) => {
      this.setUppedFiles(res.data);
      this.setMessage(LV.INF, `Uload succcessfully : ${file.name}`);
    })
    .catch((err) => {
      console.dir(err);
      this.setMessage(LV.ERR, `Upload failed : ${file}`);
    });
  }

  download(file) {
    UploadAjax.downloadFile(file.id);
    this.setMessage(LV.INF, `Finish download : #${file.id} ${file.name}`);
  }

  remove(file) {
    UploadAjax.removeFile(file.id)
    .then(() => UploadAjax.getAll())
    .then((res) => {
      this.setUppedFiles(res.data);
      this.setMessage(LV.INF, `Remove succcessfully : #${file.id} ${file.name}`);
    })
    .catch((err) => {
      console.dir(err);
      this.setMessage(LV.ERR, `Remove failed : #${file.id} ${file.name}`);
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
  return <div className={mesClass}>{props.message.mes}</div>;
}

UploadMessage.propTypes = {
  message: PropTypes.shape({
    lev: PropTypes.number.isRequired,
    mes: PropTypes.string.isRequired,
  }).isRequired,
};

export default UploadMain;
