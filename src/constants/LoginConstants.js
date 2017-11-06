import Config from '../../config.js';

var BASE_URL = Config.LOGINAUTH_URL;
export default {
  BASE_URL: BASE_URL,
  LOGIN_URL: BASE_URL+'/login/',
  RETURN_URL: Config.DCOSUI_URL
}