import React, { Component } from 'react';
import './App.css';
import HeadingBar from './components/HeadingBar';
import TopicSelector from './components/TopicSelector';
import { Router } from '@reach/router';
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
    const { articles, _id } = this.state;
    return (
      <div className="App">
        <HeadingBar />
        <TopicSelector />
        <Router className="mainBody">
          <ArticlesContainer articles={articles} path="/" />
          <TopicContainer path="/topics/:slug/articles" />
          <ArticleContainer path="/articles/:article_id" />
          <UserInfo articles={articles} path="/users/:username" />
          <AddArticle user={_id} path="/:slug/articles/post" />
          <NewLogin login={this.login} path="/login" />
        </Router>
      </div>
    );
  }

  componentDidMount() {
    const _id = localStorage.getItem('userID');
    api.getArticles().then(articles => {
      this.setState({
        articles,
        _id
      });
    });
  }

  login = (_id, user) => {
    localStorage.setItem('userID', _id);
    localStorage.setItem('user', user);
    this.setState({
      _id,
      user
    });
  };
}

// 5be5a46204b14900162046c7

export default App;
