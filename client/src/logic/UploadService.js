import AuthHandler from './AuthHandler';

const Naxios = AuthHandler.getNaxios();

/**
 * File Upload 処理用サービス
 */
export default class UploadService {
  /**
   * get all uploaded files data
   */
  static getAll(success, fail) {
    Naxios.get('/upload/all')
    .then((res) => { success(res); })
    .catch((err) => {
      fail(err);
      AuthHandler.onAuthError(err);
    });
  }

  /**
   * upload file data
   */
  static uploadFile(file, success, fail) {
    const formData = new FormData();
    formData.append('upfile', file);

    Naxios.post('/upload', formData)
    .then(() => Naxios.get('/upload/all'))
    .then((res) => { success(res); })
    .catch((err) => {
      fail(err);
      AuthHandler.onAuthError(err);
    });
  }

  /**
   * download File from Blob object
   */
  static downloadFromBlob(blob, filename) {
    if (typeof window.navigator.msSaveBlob !== 'undefined') {
      // IE の場合 console.log('msSaveBlob');
      window.navigator.msSaveBlob(blob, filename);
    } else {
      // Chrome や Firefox 等の場合 console.log('no msSaveBlob');
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
    Naxios.get(`/upload/${file.id}`, { responseType: 'blob' })
    .then((res) => {
      // Blobオブジェクトを生成
      // type は application/octet-stream で良いはず
      const blob = new Blob([res.data], { type: 'application/octet-stream' });
      // Blobオブジェクトからファイルをダウンロード
      UploadService.downloadFromBlob(blob, file.name);
      success('OK');
    })
    .catch((err) => {
      fail(err);
      AuthHandler.onAuthError(err);
    });
  }

  /**
   * remove file
   */
  static removeFile(file, success, fail) {
    Naxios.delete(`/upload/${file.id}`)
    .then(() => Naxios.get('/upload/all'))
    .then((res) => { success(res); })
    .catch((err) => {
      fail(err);
      AuthHandler.onAuthError(err);
    });
  }

  /*
   * get error message
   */
  static getEmes(err) {
    let emes;
    if (err && err.response && err.response.data) {
      emes = `${err.response.data.message} status ${err.response.status}`;
    } else if (err.message) {
      emes = err.message;
    } else {
      emes = 'Unkown Error !!!';
    }
    return emes;
  }
}
