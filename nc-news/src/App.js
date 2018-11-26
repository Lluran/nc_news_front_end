import React, { Component } from 'react';
import './App.css';
import HeadingBar from './components/HeadingBar';
import TopicSelector from './components/TopicSelector';
import { Router } from '@reach/router';
import ArticlesContainer from './components/ArticlesContainer';
import TopicContainer from './components/TopicContainer';
import ArticleContainer from './components/ArticleContainer';
import UserInfo from './components/UserInfo';

class App extends Component {
  render() {
    return (
      <div className="App">
      <HeadingBar/>
      <TopicSelector />
      <Router className="mainBody">
        <ArticlesContainer path='/'/>
        <TopicContainer path='/topics/:topic_slug/articles' />
        <ArticleContainer path='/articles/:article_id'/>
        <UserInfo path='/users/:username' />
      </Router>
      </div>
    );
  }
}

export default App;
