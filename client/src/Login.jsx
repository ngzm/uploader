import React, { Component } from 'react';
import LoginService from './logic/LoginService';
import './Login.css';

export default class Login extends Component {
  onSubmit(evt) {
    evt.preventDefault();
    LoginService.login(this.inputUser.value, this.inputPwd.value);
  }

  render() {
    return (
      <section className="Login">
        <h5>Please Login ..</h5>
        <form onSubmit={(e) => { this.onSubmit(e); }}>
          <div>
            <input
              type="text"
              ref={(emt) => { this.inputUser = emt; }}
              placeholder="username"
            />
          </div>
          <div>
            <input
              type="password"
              ref={(emt) => { this.inputPwd = emt; }}
              placeholder="password"
            />
          </div>
          <button>Login</button>
        </form>
      </section>
    );
  }
}
