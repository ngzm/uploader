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
  static downloadFile(file) {
    // Axios でファイルダウンロードする場合で、ファイルデータを
    // Blob に格納する場合は、{ responsetype: 'blob' } の指定が
    // 必要。さもないと blob データ形式で res.data に格納されない。
    Axios.get(`/upload/${file.id}`, { responseType: 'blob' })
    .then((res) => {
      console.dir(res);

      // type は application/octet-stream で良いはず
      const blob = new Blob([res.data], { type: 'application/octet-stream' });

      if (typeof window.navigator.msSaveBlob !== 'undefined') {
        console.log('msSaveBlob');

        // IE の場合
        window.navigator.msSaveBlob(blob, file.name);
      } else {
        console.log('no msSaveBlob');

        // Chrome や Firefox などの場合
        const blobUrl = window.URL.createObjectURL(blob);

        // ダミーのA要素を作成し、そこから blob データをDLさせる
        const dummylink = document.createElement('a');
        dummylink.style.display = 'none';
        dummylink.href = blobUrl;
        dummylink.setAttribute('download', file.name);
        dummylink.setAttribute('target', '_blank');
        document.body.appendChild(dummylink);
        dummylink.click();

        // ダミーで作成したA要素や BlobUrl を削除
        document.body.removeChild(dummylink);
        window.URL.revokeObjectURL(blobUrl);
      }
    })
    .catch((err) => {
      console.log(err);
    });
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
