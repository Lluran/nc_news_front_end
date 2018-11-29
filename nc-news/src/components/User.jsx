import React from 'react';
import PropTypes from 'prop-types';
import './User.css'

const User = props => {
  const { avatar_url, name, username } = props.user;
  return (
    <section className="userInfo">
      <img className="userImg" src={`${avatar_url}`} alt="user avatar" />
      <p className="userInfoUsername">Username: <br/><strong className="usernameOnArticleMini">{username}</strong></p>
      <p className="userInfoName">Name: <br/><strong>{name}</strong></p>
    </section>
  );
};

User.propTypes = {
  user: PropTypes.object.isRequired
};

export default User;
