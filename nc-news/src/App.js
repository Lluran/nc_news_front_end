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
    _id: ''
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
            <AddArticle user={_id} path="/:slug/articles/post"/>
            <NewLogin login={this.login} path="/login"/>
          </Router>
      </div>
    );
  }

  componentDidMount() {
    api.getArticles().then(articles => {
      this.setState({
        articles
      });
    });
    //possibly check local storage for user
  }

  login = _id => {
    this.setState({
      _id
    });
    //possibly add to local storage
  };
}

// 5be5a46204b14900162046c7

export default App;
