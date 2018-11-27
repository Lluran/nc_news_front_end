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

class App extends Component {
  state = {
    articles: [],
    user: {}
  };
  render() {
    const { articles } = this.state;
    return (
      <div className="App">
        {/* <NewLogin login={this.login} user={this.state.user}> */}
          <HeadingBar />
          <TopicSelector />
          <Router className="mainBody">
            <ArticlesContainer articles={articles} path="/" />
            <TopicContainer path="/topics/:slug/articles" />
            <ArticleContainer path="/articles/:article_id" />
            <UserInfo articles={articles} path="/users/:username" />
          </Router>
        {/* </NewLogin> */}
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

  login = user => {
    this.setState({
      user
    });
    //possibly add to local storage
  };
}

export default App;
