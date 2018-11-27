import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from '../api';

class NewLogin extends Component {
  state = {
    username: ''
  };
  render() {
    console.log(this.props.user);
    if (this.props.user.username) return this.props.children;
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="username">Username: </label>
        <input id="username" type="text" onChange={this.handleChange} />
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
    api.login(this.state.username).then(user => {
      this.props.login(user);
    });
  };
}

NewLogin.propTypes = {};

export default NewLogin;
