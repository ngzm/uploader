import Axios from 'axios';

export default class UploadAjax {
  /**
   * get all uploaded files data
   */
  static getAll(success, fail) {
    Axios.get('/upload/all')
    .then((res) => {
      console.dir(res);
      success(res);
    })
    .catch((err) => {
      console.dir(err);
      fail(err);
    });
  }

  /**
   * upload file data
   */
  static uploadFile(file, success, fail) {
    const formData = new FormData();
    formData.append('upfile', file);

    Axios.post('/upload', formData)
    .then((res) => {
      console.dir(res);
      return Axios.get('/upload/all');
    })
    .then((res) => {
      console.dir(res);
      success(res);
    })
    .catch((err) => {
      console.dir(err);
      fail(err);
    });
  }

  /**
   * download File from Blob object
   */
  static downloadFromBlob(blob, filename) {
    if (typeof window.navigator.msSaveBlob !== 'undefined') {
      // IE の場合
      console.log('msSaveBlob');

      window.navigator.msSaveBlob(blob, filename);
    } else {
      // Chrome や Firefox 等の場合
      console.log('no msSaveBlob');

      // Blob URL Scheme にDLデータを格納する
      const blobURL = window.URL.createObjectURL(blob);

      // ダミーのA要素を作成
      const dummyA = document.createElement('a');
      dummyA.style.display = 'none';
      dummyA.setAttribute('download', filename);
      dummyA.setAttribute('target', '_blank');
      document.body.appendChild(dummyA);

      // ダミーA要素からblobデータをDLさせる
      dummyA.href = blobURL;
      dummyA.click();

      // ダミーA要素やBlob URL Shemeを削除
      document.body.removeChild(dummyA);
      window.URL.revokeObjectURL(blobURL);
    }
  }

  /**
   * download file
   */
  static downloadFile(file, success, fail) {
    // Axios でファイルダウンロードする場合で、ファイルデータを
    // Blob に格納する場合は、{ responsetype: 'blob' } の指定が
    // 必要。さもないと blob データ形式で res.data に格納されない。
    Axios.get(`/upload/${file.id}`, { responseType: 'blob' })
    .then((res) => {
      console.dir(res);
      // Blobオブジェクトを生成
      // type は application/octet-stream で良いはず
      const blob = new Blob([res.data], { type: 'application/octet-stream' });
      // Blobオブジェクトからファイルをダウンロード
      UploadAjax.downloadFromBlob(blob, file.name);
      success('OK');
    })
    .catch((err) => {
      console.dir(err);
      fail(err);
    });
  }

  /**
   * remove file
   */
  static removeFile(file, success, fail) {
    Axios.delete(`/upload/${file.id}`)
    .then((res) => {
      console.dir(res);
      return Axios.get('/upload/all');
    })
    .then((res) => {
      console.dir(res);
      success(res);
    })
    .catch((err) => {
      console.dir(err);
      fail(err);
    });
  }
}
