import React, { Component } from 'react';
import './App.css';
import HeadingBar from './components/HeadingBar';
import TopicSelector from './components/TopicSelector';
import { Router } from '@reach/router';
import ArticlesContainer from './components/ArticlesContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
      <HeadingBar/>
      <TopicSelector/>
      <Router>
        <ArticlesContainer path='/'/>
      </Router>
      </div>
    );
  }
}

export default App;
