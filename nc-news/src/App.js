import React, { Component } from 'react';
import './App.css';
import HeadingBar from './components/HeadingBar';
import TopicSelector from './components/TopicSelector';
import { Router } from '@reach/router';
import ArticlesContainer from './components/ArticlesContainer';
import TopicContainer from './components/TopicContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
      <HeadingBar/>
      <TopicSelector />
      <Router className="mainBody">
        <ArticlesContainer path='/'/>
        <TopicContainer path='/topics/:topic_slug/articles' />
      </Router>
      </div>
    );
  }
}

export default App;
