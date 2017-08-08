const AUTHTOKEN_STORAGE_KEY = 'ngzm_uplader_authentication_token';
export default {
  get: () => localStorage.getItem(AUTHTOKEN_STORAGE_KEY),
  set: (token) => { localStorage.setItem(AUTHTOKEN_STORAGE_KEY, token); },
  remove: () => { localStorage.removeItem(AUTHTOKEN_STORAGE_KEY); },
};
