import Axios from 'axios';

export default class UploadAjax {
  /**
   * get all uploaded files data
   *
   * return Promise
   */
  static getAll() {
    return Axios.get('/upload/all');
  }

  /**
   * post file data
   *
   * return Promise
   */
  static postFile(file) {
    const formData = new FormData();
    formData.append('upfile', file);
    return Axios.post('/upload', formData);
  }

  /**
   * download filea
   */
  static downloadFile(id) {
    setTimeout(() => { window.open(`/upload/${id}`); }, 100);
  }

  /**
   * post file data
   *
   * return Promise
   */
  static removeFile(id) {
    return Axios.delete(`/upload/${id}`);
  }
}
