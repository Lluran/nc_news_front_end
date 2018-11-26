import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Login extends Component {
  render() {
    return (
      <form>
        <label htmlFor='usernameInput'>Username: </label>
        <input type='text' id='usernameInput' placeholder='username'/>
        <label htmlFor='passwordInput'>Password: </label>
        <input type='text' id='passwordInput' placeholder='password' />
        <button type='submit'>Submit</button>
      </form>
    );
  }
}

Login.propTypes = {

};

export default Login;