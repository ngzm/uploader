import Axios from 'axios';
import AuthTokenStorage from './webstorage';

/**
 * Axios オブジェクトを生成
 */
const axiosObj = Axios.create();

/**
 * Axios のリクエストに Authorization Header
 * を Intercept する
 */
axiosObj.interceptors.request.use(
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

export default axiosObj;

/**
 * こうしてもよいという例
 *
 *
import Axios from 'axios';
import AuthTokenStorage from './webstorage';

Axios.interceptors.request.use(
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

export default class UploadService {

  static getAll(success, fail) {
    Axios.get('/upload/all')
    .then((res) => { success(res); })
    .catch((err) => {
      fail(err);
      UploadService.handleAuthError(err);
    });
  }
}
*
*/
