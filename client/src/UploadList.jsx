import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './UploadList.css';

class UploadList extends Component {
  download(evt) {
    console.log('download event');
    console.dir(evt);
  }

  remove(evt) {
    console.log('remove event');
    console.dir(evt);
  }

  render() {
    const upJsxs = [];
    this.props.upfiles.forEach((up) => {
      upJsxs.push(
        <UpFile
          upfile={up}
          onDownload={(e) => { this.download(e); }}
          onRemove={(e) => { this.remove(e); }}
        />,
      );
    });

    return (
      <section>
        <table>
          <tr><th>ID</th><th>name</th><th>size</th><th>up date</th></tr>
          {upJsxs}
        </table>
      </section>
    );
  }
}

UploadList.propTypes = {
  upfiles: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
  }).isRequired).isRequired,
};

function UpFile(props) {
  return (
    <tr>
      <td>{props.up.id}</td>
      <td>{props.up.name}</td>
      <td>{props.up.size}</td>
      <td>{props.up.date}</td>
      <td><button onClick={(e) => { props.onDownload(e); }}>DL</button></td>
      <td><button onClick={(e) => { props.onRemove(e); }}>RM</button></td>
    </tr>
  );
}

UpFile.propTypes = {
  up: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
  }).isRequired,
  onDownload: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default UploadList;
