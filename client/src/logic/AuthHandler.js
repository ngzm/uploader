import rsasign from 'jsrsasign';

import AuthTokenStorage from '../lib/webstorage';
import ShareObj from '../lib/shareobj';
import Naxios from '../lib/naxios';

export default {
  isAuthed: () => (AuthTokenStorage.get() !== null),
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
  getNaxios: () => Naxios,
  attachShareObj: (obj, func) => { ShareObj.attach(obj, func); },
  dettachShareObj: () => { ShareObj.dettach(); },
  getUsername: () => {
    let username = null;
    const token = AuthTokenStorage.get();
    if (token) {
      const claim = rsasign.jws.JWS.readSafeJSONString(rsasign.b64utoutf8(token.split('.')[1]));
      username = (claim && claim.sub) ? claim.sub : null;
    }
    return username;
  },
};
