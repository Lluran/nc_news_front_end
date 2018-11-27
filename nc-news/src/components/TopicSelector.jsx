import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Router, Link} from '@reach/router';
import * as api from '../api';

class TopicSelector extends Component {
  state = {
    topics: []
  }
  render() {
    const {topics} = this.state;
    return (
      <section className="TopicSelector">
        <h3>Topics</h3>
        <nav>
          {topics.map(topicObj => {
            return <Link key={topicObj._id} className="topicLink" to={`/topics/${topicObj.slug}/articles`}>{topicObj.title}</Link>
          })}
        </nav>
      </section>
    );
  }

  componentDidMount () {
    api.getTopics()
    .then(topics => {
      this.setState({
        topics
      })
    })
  }
}

TopicSelector.propTypes = {

};

export default TopicSelector;