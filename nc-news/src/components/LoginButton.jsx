import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';

class LoginButton extends Component {
  state = {
    user: ''
  };
  render() {
    const { user } = this.state;
    return (
      <form>
        {user.length > 0 && (
          <button className="loginButton" type="" name="logout" onClick={this.handleLogClick}>
            Logout: {user}
          </button>
        )}
        {user.length === 0 && (
          <button className="loginButton" type="" name="login" id="login" onClick={this.handleLogClick}>
            Login
          </button>
        )}
      </form>
    );
  }

  componentDidMount() {
    const user = sessionStorage.getItem('user');
    if (user) {
      this.setState({
        user
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { user } = prevState;
    if (user !== this.props.user) {
      this.setState({
        user: this.props.user
      });
    }
  }

  handleLogClick = event => {
    if (event.target.name === 'login') {
      navigate('/login');
    } else {
      this.setState({
        user: ''
      });
      this.props.clearUser();
    }
  };
}

LoginButton.propTypes = {
  user: PropTypes.string.isRequired,
  clearUser: PropTypes.func.isRequired
};

export default LoginButton;
