import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import * as api from '../api';
import './TopicBar.css';

class TopicSelector extends Component {
  state = {
    topics: []
  };
  render() {
    const { topics } = this.state;
    return (
      <section className="TopicSelector">
        <h3 className="topicTitle">Topics</h3>
        <nav className="topicBarNav">
          <Link className="topicLink" to="/">
            All Articles
          </Link>
          {topics.map(topicObj => {
            return (
              <Link
                key={topicObj._id}
                className="topicLink"
                to={`/topics/${topicObj.slug}/articles`}
              >
                {topicObj.title}
              </Link>
            );
          })}
        </nav>
      </section>
    );
  }

  componentDidMount() {
    api.getTopics().then(topics => {
      this.setState({
        topics
      });
    });
  }
}

// TopicSelector.propTypes = {

// };

export default TopicSelector;
