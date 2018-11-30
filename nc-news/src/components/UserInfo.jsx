import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ArticlesContainer from './ArticlesContainer';
import User from './User';
import * as api from '../api';
import './Comments.css';
import './User.css';

class UserInfo extends Component {
  state = {
    user: {},
    isLoading: true
  };
  render() {
    const { user, isLoading } = this.state;
    const userArticles = this.props.articles.filter(articleObj => {
      return articleObj.created_by.username === user.username;
    });
    if (isLoading) {
      return <p>Loading...</p>;
    }
    return (
      <section className="userContainer">
        <User user={user} />
        <ArticlesContainer slug="userArticles" articles={userArticles} />
      </section>
    );
  }

  componentDidMount() {
    api.getUser(this.props.username).then(user => {
      this.setState({
        user,
        isLoading: false
      });
    });
  }
}

UserInfo.propTypes = {
  articles: PropTypes.array.isRequired,
  username: PropTypes.string
};

export default UserInfo;
