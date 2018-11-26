import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';

class CommentsContainer extends Component {
  render() {
    return (
      <section>
        <Comment />
      </section>
    );
  }
}

CommentsContainer.propTypes = {

};

export default CommentsContainer;