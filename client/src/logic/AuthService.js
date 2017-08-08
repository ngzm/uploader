import Axios from 'axios';
import AuthTokenStorage from './webstorage';
import ShareObj from './shareobj';

export default class AuthService {
  static login(username, password) {
    const userdata = { username, password };
    let token = null;

    Axios.post('/login', userdata)
    .then((res) => {
      token = (res.data) ? res.data.authtoken : null;
      if (token) {
        AuthTokenStorage.set(token);
        ShareObj.apply(true);
      }
    })
    .catch(() => {
      AuthTokenStorage.remove();
    });
  }

  static logout() {
    AuthTokenStorage.remove();
    ShareObj.apply(false);
  }

  static isAuthed() {
    const token = AuthTokenStorage.get();
    return (token !== null);
  }
}
