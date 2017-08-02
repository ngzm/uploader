const LOCAL_STORAGE_KEY = 'ngzm_uplader_authentication_token';

export default class AuthService {
  static login(usr, pwd) {
    let token = null;
    if (usr !== '' && pwd !== '') {
      token = `${usr}:${pwd}`;
    }
    console.log(`token: ${token}`);

    //
    // 本当はここでサーバで認証して JWT を取得する
    //

    if (token) {
      localStorage.setItem(LOCAL_STORAGE_KEY, token);
      return true;
    }
    return false;
  }

  static logout() {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }

  static getToken() {
    const token = localStorage.getItem(LOCAL_STORAGE_KEY);
    console.log(`token: ${token}`);

    return token;
  }

  static isAuthed() {
    return (AuthService.getToken() !== null);
  }
}
