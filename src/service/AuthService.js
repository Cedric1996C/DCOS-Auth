import request from 'reqwest';
import when from 'when';
import {LOGIN_URL, SIGNUP_URL} from '../constants/LoginConstants';
import em from '../components/em'


class AuthService {

  login(username, password) {
    return when(request({
      url: LOGIN_URL,
      method: 'POST',
      crossOrigin: true,
      type: 'json',
      data: {
         username: username,
         password: password
      }
    })).then(function(response) {
        const status = response.status;
        const search = window.location.search
        if(status == 'ok'){
          em.emit('login', username, search);
          return true;
        }
      });;
  }
}

export default new AuthService()