import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import Login, { Logout } from './Login';
import UploadMain from './UploadMain';
import AuthService from './logic/AuthService';
import CompSharing from './logic/CompSharing';

class AppMain extends Component {
  constructor(props) {
    super(props);
    this.state = { isAuth: false };
  }

  componentWillMount() {
    this.setAuth();
    CompSharing.setComp(this);
  }

  componentWillUnmount() {
    CompSharing.unsetComp();
  }

  setAuth() {
    this.setState({ isAuth: AuthService.isAuthed() });
  }

  sharedFunc() {
    this.setAuth();
  }

  render() {
    return (
      <main>
        <div><Logout /></div>
        <Switch>
          <Route
            exact
            path="/"
            render={props => <Public auth={this.state.isAuth} {...props} />}
          />
          <Route
            Path="/upmain"
            render={props => <Private auth={this.state.isAuth} {...props} />}
          />
        </Switch>
      </main>
    );
  }
}

function Public(props) {
  return (props.auth) ? <Redirect to={'/upmain'} /> : <Login />;
}

function Private(props) {
  return (props.auth) ? <UploadMain /> : <Redirect to={'/'} />;
}

Public.propTypes = { auth: PropTypes.bool.isRequired };
Private.propTypes = { auth: PropTypes.bool.isRequired };

export default AppMain;
