import React, { Component } from 'react';
import PropTypes from 'prop-types';

const LOCAL_STORAGE_KEY = 'ngzm_uplader_authentication_token';

class Auth extends Component {
  componentWillMount() {
    this.userWillTransfer();
  }

  componentWillUpdate() {
    this.userWillTransfer();
  }

  userWillTransfer() {
    // localStorage.removeItem(LOCAL_STORAGE_KEY);

    if (!localStorage.getItem(LOCAL_STORAGE_KEY)) {
      this.props.history.push('/');
    }
  }

  render() {
    return (
      <div>{this.props.children}</div>
    );
  }
}

Auth.propTypes = {
  history: PropTypes.shape().isRequired,
  children: PropTypes.shape().isRequired,
};
export default Auth;
