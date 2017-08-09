import Axios from 'axios';
import AuthTokenStorage from './webstorage';

/**
 * Axios オブジェクトを生成
 */
const naxios = Axios.create();

/**
 * Axios のリクエストに Authorization Header
 * を Intercept する
 */
naxios.interceptors.request.use(
  (config) => {
    const token = AuthTokenStorage.get();
    if (token != null) {
      const cf = config;
      cf.headers.Authorization = `Bearer ${token}`;
      return cf;
    }
    return config;
  },
  error => Promise.reject(error),
);

export default naxios;
