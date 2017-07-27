import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './UploadList.css';

/**
 * UploadList
 */
class UploadList extends Component {
  downloadFile(id) {
    console.log('download event');
    console.log(`id = ${id}`);
  }

  removeFile(id) {
    console.log('remove event');
    console.log(`id = ${id}`);
  }

  render() {
    console.dir(this.props.uppedfiles);

    const head = <ListHead />;
    const rows = this.props.uppedfiles.map(f => (
      <ListRow
        key={f.id}
        uppedfile={f}
        onDownload={(id) => { this.downloadFile(id); }}
        onRemove={(id) => { this.removeFile(id); }}
      />));

    return (
      <section>
        <table>
          <thead>
            {head}
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </section>
    );
  }
}

UploadList.propTypes = {
  uppedfiles: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
  }).isRequired).isRequired,
};

/**
 * ListHead
 */
function ListHead() {
  return (
    <tr>
      <th>ID</th>
      <th>name</th>
      <th>size</th>
      <th>up date</th>
      <th>DL</th>
      <th>RM</th>
    </tr>
  );
}

/**
 * ListRow
 */
function ListRow(props) {
  const upf = props.uppedfile;
  return (
    <tr>
      <td>{upf.id}</td>
      <td>{upf.name}</td>
      <td>{upf.size}</td>
      <td>{upf.date.toLocaleString('ja-JP')}</td>
      <td><button onClick={() => { props.onDownload(upf.id); }}>DL</button></td>
      <td><button onClick={() => { props.onRemove(upf.id); }}>RM</button></td>
    </tr>
  );
}

ListRow.propTypes = {
  uppedfile: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
  }).isRequired,
  onDownload: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default UploadList;
