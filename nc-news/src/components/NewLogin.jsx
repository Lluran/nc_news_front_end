import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from '../api';
import { navigate } from '@reach/router';
import './Login.css'

class NewLogin extends Component {
  state = {
    username: '',
    attempts: 0
  };
  render() {
    return (
      <form className="loginForm" onSubmit={this.handleSubmit}>
        <h2 className="loginHeading">Login: </h2>
        {this.state.attempts > 0 && (
          <h3 className="failedLogin">Login attempt failed. Incorrect username.</h3>
        )}
        <label className="usernameOnLogin" htmlFor="username">Username: </label>
        <input
         className="loginField"
          id="username"
          type="text"
          onChange={this.handleChange}
          value={this.state.username}
        />
        <button className="loginButton">Log in</button>
      </form>
    );
  }

  handleChange = event => {
    const { id, value } = event.target;
    this.setState({
      [id]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    api
      .getUser(this.state.username)
      .then(user => {
        if (user._id) {
          this.props.login(user._id, user.username);
          navigate(`/users/${user.username}`, { replace: true });
        }
      })
      .catch(() => {
        this.setState(state => {
          return {
            username: '',
            attempts: state.attempts + 1
          };
        });
      });
  };
}

NewLogin.propTypes = {
  login: PropTypes.func.isRequired
};

export default NewLogin;
