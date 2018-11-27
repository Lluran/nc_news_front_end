import React, { Component } from 'react';
import './App.css';
import HeadingBar from './components/HeadingBar';
import TopicSelector from './components/TopicSelector';
import { Router } from '@reach/router';
import ArticlesContainer from './components/ArticlesContainer';
import TopicContainer from './components/TopicContainer';
import ArticleContainer from './components/ArticleContainer';
import UserInfo from './components/UserInfo';
import * as api from "./api";

class App extends Component {
  state ={
    articles: []
  }
  render() {
    const {articles} = this.state;
    return (
      <div className="App">
      <HeadingBar/>
      <TopicSelector />
      <Router className="mainBody">
        <ArticlesContainer articles={articles} path='/'/>
        <TopicContainer path='/topics/:slug/articles' />
        <ArticleContainer path='/articles/:article_id'/>
        <UserInfo path='/users/:username' />
      </Router>
      </div>
    );
  }

  componentDidMount () {
    api.getArticles()
    .then(articles => {
      this.setState({
        articles
      })
    })
  }
}

export default App;
