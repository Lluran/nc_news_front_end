import React, { Component } from 'react';
import './App.css';
import HeadingBar from './components/HeadingBar';
import TopicSelector from './components/TopicSelector';
import { Router, navigate } from '@reach/router';
import ArticlesContainer from './components/ArticlesContainer';
import TopicContainer from './components/TopicContainer';
import ArticleContainer from './components/ArticleContainer';
import UserInfo from './components/UserInfo';
import * as api from './api';
import NewLogin from './components/NewLogin';
import AddArticle from './components/AddArticle';

class App extends Component {
  state = {
    articles: [],
    _id: '',
    user: ''
  };
  render() {
    const { articles, _id, user } = this.state;
    return (
      <div className="App">
        <HeadingBar user={user} clearUser={this.clearUser} />
        <TopicSelector />
        <Router className="mainBody">
          <ArticlesContainer articles={articles} path="/" />
          <TopicContainer path="/topics/:slug/articles" />
          <ArticleContainer user={user} path="/articles/:article_id" />
          <UserInfo articles={articles} path="/users/:username" />
          <AddArticle
            updateArticles={this.updateArticles}
            user={_id}
            path="/:slug/articles/post"
          />
          <NewLogin login={this.login} path="/login" />
        </Router>
      </div>
    );
  }

  componentDidMount() {
    const _id = sessionStorage.getItem('userID');
    const user = sessionStorage.getItem('user');
    api.getArticles().then(articles => {
      if (_id !== null) {
        this.setState({
          articles,
          user,
          _id
        });
      } else {
        this.setState({
          articles
        });
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('updating app');
    api.getArticles().then(freshArticles => {
      if (freshArticles.length !== prevState.articles.length) {
        this.setState({
          articles: freshArticles
        });
      }
    });
  }

  login = (_id, user) => {
    sessionStorage.setItem('userID', _id);
    sessionStorage.setItem('user', user);
    this.setState({
      _id,
      user
    });
  };

  clearUser = () => {
    sessionStorage.clear();
    this.setState({
      _id: '',
      user: ''
    });
    navigate('/');
  };

  updateArticles = newArticle => {
    const updatedArticles = [newArticle, ...this.state.articles];
    this.setState({
      articles: updatedArticles
    });
  };
}

export default App;
