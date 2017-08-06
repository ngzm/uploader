import Axios from 'axios';

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

const LOCAL_STORAGE_KEY = 'ngzm_uplader_authentication_token';

export default class AuthService {
  static login(usr, pwd) {
    const userdata = {
      username: usr,
      password: pwd,
    };
    console.log(`userdata: ${userdata}`);

    let token = null;
    Axios.post('/login', userdata)
    .then((res) => {
      console.dir(res);
      token = (res.data) ? res.data.authtoken : null;
      if (token) {
        localStorage.setItem(LOCAL_STORAGE_KEY, token);
        MainComp.setAuthState(true);
      }
    })
    .catch((err) => {
      console.dir(err);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    });
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
