import React from 'react';
import PropTypes from 'prop-types';
import LoginButton from './LoginButton';
import './HeadingBar.css'

const HeadingBar = props => {
  return (
    <header className="HeadingBar">
      <h1 className="title">Northcoders News</h1>
      <div className="loginBar">{props.user.length === 0 && <p className="loginText">Login to comment or post an article!</p>}
      <LoginButton  user={props.user} clearUser={props.clearUser} /></div>
    </header>
  );
};

HeadingBar.propTypes = {
  user: PropTypes.string.isRequired,
  clearUser: PropTypes.func.isRequired
};

export default HeadingBar;
