import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Auth from './Authentication';

class Login extends Component {
  authenticate() {
    if (Auth.login(this.inputUser.value, this.inputPwd.value)) {
      this.props.onLogin();
    }
  }

  render() {
    return (
      <section>
        <h3>ログイン</h3>
        <div>
          <input type="text" ref={(em) => { this.inputUser = em; }} placeholder="username" />
        </div>
        <div>
          <input type="password" ref={(em) => { this.inputPwd = em; }} placeholder="password" />
        </div>
        <button type="button" onClick={() => { this.authenticate(); }}>Login</button>
      </section>
    );
  }
}

Login.propTypes = { onLogin: PropTypes.func.isRequired };
export default Login;
