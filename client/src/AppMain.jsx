import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import Login from './Login';
import UploadMain from './UploadMain';

export default function AppMain(props) {
  return (
    <main>
      <Switch>
        <Route
          exact
          path="/"
          render={pps => <Public auth={props.auth} {...pps} />}
        />
        <Route
          Path="/upmain"
          render={pps => <Private auth={props.auth} {...pps} />}
        />
      </Switch>
    </main>
  );
}

function Public(props) {
  return (props.auth) ? <Redirect to={'/upmain'} /> : <Login />;
}

function Private(props) {
  return (props.auth) ? <UploadMain /> : <Redirect to={'/'} />;
}

AppMain.propTypes = { auth: PropTypes.bool.isRequired };
Public.propTypes = { auth: PropTypes.bool.isRequired };
Private.propTypes = { auth: PropTypes.bool.isRequired };
