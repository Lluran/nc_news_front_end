import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ArticlesContainer from './ArticlesContainer';

class TopicContainer extends Component {
  render() {
    return (
      <main>
        <h2>Topic Heading Goes Here</h2>
        <ArticlesContainer/>
      </main>
    );
  }
}

TopicContainer.propTypes = {

};

export default TopicContainer;