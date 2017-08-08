import AuthTokenStorage from '../lib/webstorage';
import ShareObj from '../lib/shareobj';
import Naxios from '../lib/naxios';

export default {
  onLogin: (res) => {
    const token = (res.data) ? res.data.authtoken : null;
    if (token) {
      AuthTokenStorage.set(token);
      ShareObj.apply(true);
    }
  },
  onLoginError: () => {
    AuthTokenStorage.remove();
  },
  onLogout: () => {
    AuthTokenStorage.remove();
    ShareObj.apply(false);
  },
  onAuthError: (err) => {
    if (err && err.response && err.response.status === 401) {
      AuthTokenStorage.remove();
      ShareObj.apply(false);
    }
  },
  isAuthed: () => (AuthTokenStorage.get() !== null),
  attachShareObj: (obj, func) => { ShareObj.attach(obj, func); },
  dettachShareObj: () => { ShareObj.dettach(); },
  getNaxios: () => Naxios,
};
