import React, { Component } from 'react';
import AuthService from './logic/AuthService';
import CompSharing from './logic/CompSharing';

export default class Login extends Component {
  onLogin() {
    if (AuthService.login(this.inputUser.value, this.inputPwd.value)) {
      CompSharing.execSharedFunc();
    }
  }

  render() {
    return (
      <section>
        <h3>ログイン</h3>
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
        <button type="button" onClick={() => { this.onLogin(); }}>Login</button>
      </section>
    );
  }
}

export function Logout() {
  const onLogout = () => {
    AuthService.logout();
    CompSharing.execSharedFunc();
  };

  return <button type="button" onClick={onLogout}>Logout</button>;
}
