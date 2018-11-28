import React from 'react';
import PropTypes from 'prop-types';
import LoginButton from './LoginButton';

const HeadingBar = props => {
  return (
    <header className="HeadingBar">
      <img
        src="https://northcoders.com/images/logos/learn_to_code_manchester_rw_original.png"
        alt="Northcoders Logo"
      />
      <img
        src="http://southernsynodurc.org.uk/wp-content/uploads/2015/12/News-Update-Logo.png"
        alt="News Update logo"
      />
      {props.user.length === 0 && <p>Login to comment or post an article!</p>}
      <LoginButton user={props.user} clearUser={props.clearUser} />
    </header>
  );
};

HeadingBar.propTypes = {
  user: PropTypes.string.isRequired,
  clearUser: PropTypes.func.isRequired
};

export default HeadingBar;
