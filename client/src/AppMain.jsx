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
    this.setAuth();
  }

  setAuth() {
    this.setState({ isAuth: Auth.isAuthed() });
  }

  render() {
    const rProp = { auth: this.state.isAuth, sets: () => { this.setAuth(); } };
    return (
      <main>
        <Switch>
          <Route exact path="/" render={props => <Public rProp={rProp} {...props} />} />
          <Route Path="/upmain" render={props => <Private rProp={rProp} {...props} />} />
        </Switch>
      </main>
    );
  }
}

function Public(props) {
  return (
    (props.rProp.auth)
    ? <Redirect to={'/upmain'} />
    : <Login onLogin={() => { props.rProp.sets(); }} />
  );
}

Public.propTypes = {
  rProp: PropTypes.shape({
    auth: PropTypes.bool.isRequired,
    sets: PropTypes.func.isRequired,
  }).isRequired,
};

function Private(props) {
  return (
    (props.rProp.auth)
    ? <UploadMain onLogout={() => { props.rProp.sets(); }} />
    : <Redirect to={'/'} />
  );
}

Private.propTypes = {
  rProp: PropTypes.shape({
    auth: PropTypes.bool.isRequired,
    sets: PropTypes.func.isRequired,
  }).isRequired,
};

export default AppMain;
