import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from '../api';
import { navigate } from '@reach/router';

class NewLogin extends Component {
  state = {
    username: '',
    attempts: 0
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Login: </h2>
        {this.state.attempts > 0 && (
          <h3>Login attempt failed. Incorrect username.</h3>
        )}
        <label htmlFor="username">Username: </label>
        <input
          id="username"
          type="text"
          onChange={this.handleChange}
          value={this.state.username}
        />
        <button>Log in</button>
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
