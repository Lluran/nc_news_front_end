import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CommentAdder extends Component {
  render() {
    return (
      <form>
        <label htmlFor="commentTextArea">Add a comment: </label>
        <textarea id="commentTextArea" rows='3' cols="110"></textarea>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

CommentAdder.propTypes = {

};

export default CommentAdder;