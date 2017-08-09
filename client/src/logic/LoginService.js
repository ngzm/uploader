import AuthHandler from './AuthHandler';

const Naxios = AuthHandler.getNaxios();

export default class AuthService {
  static login(username, password) {
    const userdata = { username, password };

    Naxios.post('/login', userdata)
    .then((res) => {
      AuthHandler.onLogin(res);
    })
    .catch((err) => {
      AuthHandler.onLoginError(err);
    });
  }

  static logout() {
    AuthHandler.onLogout();
  }
}
