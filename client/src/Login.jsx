import React, { Component } from 'react';
import PropTypes from 'prop-types';

const LOCAL_STORAGE_KEY = 'ngzm_uplader_authentication_token';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { token: '' };
  }

  componentWillMount() {
    const authToken = localStorage.getItem(LOCAL_STORAGE_KEY);
    this.setState({ token: authToken });
  }

  authenticate() {
    const authToken = `${this.inputUser.value}:${this.inputPwd.value}`;
    localStorage.setItem(LOCAL_STORAGE_KEY, authToken);

    this.props.history.push('/upmain');
  }

  render() {
    return (
      <section>
        <h3>ログイン</h3>
        {this.state.token}

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

Login.propTypes = {
  history: PropTypes.shape().isRequired,
};
export default Login;
