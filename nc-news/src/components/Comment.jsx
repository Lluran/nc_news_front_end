import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VoteAdder from './VoteAdder';

class Comment extends Component {
  render() {
    return (
      <section>
        <p>I am a comment</p>
        <button type="button">Delete Comment</button>
        <VoteAdder/>
      </section>
    );
  }
}

Comment.propTypes = {

};

export default Comment;