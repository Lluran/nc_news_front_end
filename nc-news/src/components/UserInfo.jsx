import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ArticlesContainer from './ArticlesContainer';
import CommentsContainer from './CommentsContainer';
import User from './User';

class UserInfo extends Component {
  render() {
    return (
      <section>
        <User/>
        <CommentsContainer/>
        <ArticlesContainer/>
      </section>
    );
  }
}

UserInfo.propTypes = {

};

export default UserInfo;