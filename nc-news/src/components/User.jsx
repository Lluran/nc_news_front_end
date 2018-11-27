import React from 'react';
import PropTypes from 'prop-types';

const User = props => {
  const {avatar_url, name, username} = props.user;
  return (
    <section>
      <img src={`${avatar_url}`} alt='user avatar' />
      <p>Username: {username}</p>
      <p>Name: {name}</p>
    </section>
  );
};

User.propTypes = {
  
};

export default User;