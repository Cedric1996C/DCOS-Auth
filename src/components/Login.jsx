import React from 'react/addons';
import ReactMixin from 'react-mixin';
import Auth from '../service/AuthService'
import { LOGIN_URL, RETURN_URL } from '../constants/LoginConstants';
import em from './em';
import request from 'reqwest';
import when from 'when';

export default class Login extends React.Component {

  constructor() {
    super()
    this.state = {
      user: '',
      password: ''
    };
    em.on('login', function(username, search) {
      $('#failAlert').hide()
      $('#successAlert').show();

      const url = `${window.location.origin}/authorize${search}&username=${username}`;
      when(request({
        url: url,
        method: 'GET',
        crossOrigin: true,
        type: 'json',
      })
      .then(function(code){
        var Code = code.code
        window.location = `${Code.redirectUri}/?code=${Code.authorizationCode}`
      })
      .catch( err => {
        console.log("no res")
      }))
      // window.close()
    }.bind(this))
  }

  logError(err) {
    $('#failAlert').show()
    // alert("There's an error logging in");
    console.log("Error logging in", err);
  }

  login(e) {
    var that = this
    e.preventDefault();
    Auth.login(this.state.user, this.state.password).catch(function (err) {
      that.logError(err)
    })

  }

  render() {
    return (
    

    <div className="modal-container">
      <div className="modal modal-narrow login-modal">
        <div className="modal-header">
          <div className="container">
            <div className="container container-fluid container-fluid-narrow container-pod container-pod-super flush-top">
              <div className="login-modal-logo">
                <img className="dcos-logo sidebar-header-image-inner" width="100" src='img/logo.png' alt=''></img>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-content allow-overflow">
          <div className="modal-content">
            <div className="modal-body modal-body-inner-content container container-pod container-pod-short flush-top">
              <h4 className="text-align-center flush-top login-modal-heading">Log in to your account</h4>
              <div className="alert-area">
                <div id='successAlert' className="alert alert-success" role="alert" style={{display: 'none'}}>
                  <strong>OK! </strong> Loading...
                </div>
                <div id='failAlert' className="alert alert-danger " role="alert" style={{display: 'none'}}>
                  <strong>Failed! </strong> Please check your username and password.
                </div>
              </div>
              <div className="oauth-button-collection button-collection flush-bottom">
                <form className='form-signin'>
                  <input type='text' name='username' className='form-control' placeholder='Username' required autofocus valueLink={this.linkState('user')}></input>
                  <input type='password' name='password' className='form-control' placeholder='Password' required valueLink={this.linkState('password')}></input>
                  <button className='btn btn-lg btn-primary btn-block' onClick={this.login.bind(this)}> Sign in</button>
                  <span className='clearfix'></span>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>



      // <div className="container">

      //   <div className='row'>
      //     <div className='col-sm-6 col-md-4 col-md-offset-4'>
      //       <h1 className='text-center login-title'>LDAP authentication</h1>
      //       <div className='account-wall'>
      //         <img className='profile-img' src='img/logo.png' alt=''></img>
              // <form className='form-signin'>
              //   <input type='text' name='username' className='form-control' placeholder='Username' required autofocus valueLink={this.linkState('user')}></input>
              //   <input type='password' name='password' className='form-control' placeholder='Password' required valueLink={this.linkState('password')}></input>
              //   <button className='btn btn-lg btn-primary btn-block' onClick={this.login.bind(this)}> Sign in</button>
              //   <span className='clearfix'></span>
              // </form>
      //         <div id='successAlert' className="alert alert-success" role="alert" style={{display: 'none', marginLeft: '8%', marginRight: '8%'}}>
      //           <strong>OK! </strong> Loading...
      //         </div>
      //         <div id='failAlert' className="alert alert-danger " role="alert" style={{display: 'none', marginLeft: '8%', marginRight: '8%'}}>
      //           <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this.alertDismiss.bind(this)}>
      //             <span aria-hidden="true">&times;</span>
      //           </button>
      //           <strong>Failed! </strong> Check your username and password.
      //       </div>
      //       </div>

      //     </div>
      //   </div>

      // </div>
    );
  }
}

ReactMixin(Login.prototype, React.addons.LinkedStateMixin);
