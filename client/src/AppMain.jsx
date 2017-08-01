import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Login from './Login';
import UploadMain from './UploadMain';
import Auth from './Authentication';

class AppMain extends Component {
  constructor(props) {
    super(props);
    this.state = { isAuth: false };
  }

  componentWillMount() {
    Auth.logout();
    this.setAuth();
  }

  setAuth() {
    this.setState({ isAuth: Auth.isAuthed() });
  }

  render() {
    return (
      <main>
        <Switch>
          <Public isAuthed={this.state.isAuth}>
            <Switch>
              <Route
                exact
                path="/"
                render={props => <Login onLogin={() => { this.setAuth(); }} {...props} />}
              />
            </Switch>
          </Public>
          <Private isAuthed={this.state.isAuth}>
            <Switch>
              <Route
                path="/upmain"
                render={props => <UploadMain onLogout={() => { this.setAuth(); }} {...props} />}
              />
            </Switch>
          </Private>
        </Switch>
      </main>
    );
  }
}

function Public(props) {
  return ((props.isAuthed) ? <Redirect to={'/upmain'} /> : <div>{props.children}</div>);
}
Public.propTypes = {
  children: PropTypes.shape().isRequired,
  isAuthed: PropTypes.bool.isRequired,
};

function Private(props) {
  return ((props.isAuthed) ? <div>{props.children}</div> : <Redirect to={'/'} />);
}
Private.propTypes = {
  children: PropTypes.shape().isRequired,
  isAuthed: PropTypes.bool.isRequired,
};

export default AppMain;
