import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AppMain from './AppMain';
import LoginService from './logic/LoginService';
import AuthHandler from './logic/AuthHandler';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isAuth: false };
  }

  componentWillMount() {
    this.setState({ isAuth: AuthHandler.isAuthed() });
    AuthHandler.attachShareObj(this, this.setAuthState);
  }

  componentWillUnmount() {
    AuthHandler.dettachShareObj();
  }

  setAuthState(flg) {
    this.setState({ isAuth: flg });
  }

  render() {
    return (
      <div className="App">
        <AppMenu auth={this.state.isAuth} />
        <AppHeader />
        <AppMain auth={this.state.isAuth} />
        <AppFooter />
      </div>
    );
  }
}

function AppHeader() {
  return (
    <div>
      <header>
        <h1>ngzm - omg</h1>
      </header>
    </div>
  );
}

function AppFooter() {
  return (
    <footer>
      <small>Beauty FRANCE</small>
    </footer>
  );
}

function AppMenu(props) {
  const authMenu = ((props.auth) ?
    (
      <span>
        Hello naoki
        <button type="button" onClick={() => { LoginService.logout(); }}>
          Logout
        </button>
      </span>
    ) : <span>nanasi-san</span>
  );
  return (
    <div className="AppMenu">
      {authMenu}
    </div>
  );
}
AppMenu.propTypes = { auth: PropTypes.bool.isRequired };

export default App;
