const LOCAL_STORAGE_KEY = 'ngzm_uplader_authentication_token';

let MainComponentObject = null;
const MainComp = {
  setComp: (comp) => { MainComponentObject = comp; },
  unsetComp: () => { MainComponentObject = null; },
  setAuthState: (flg) => {
    if (MainComponentObject && MainComponentObject.setAuthState) {
      MainComponentObject.setAuthState(flg);
    }
  },
};

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
      MainComp.setAuthState(true);
      return true;
    }
    return false;
  }

  static logout() {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    MainComp.setAuthState(false);
  }

  static getToken() {
    const token = localStorage.getItem(LOCAL_STORAGE_KEY);
    console.log(`token: ${token}`);
    return token;
  }

  static isAuthed() {
    return (AuthService.getToken() !== null);
  }

  static setMainComp(comp) {
    MainComp.setComp(comp);
  }

  static unsetMainComp() {
    MainComp.unsetComp();
  }
}
