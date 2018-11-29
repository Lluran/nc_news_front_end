import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from '../api';
import './CommentAdder.css'

class CommentAdder extends Component {
  state = {
    body: '',
    user_id: ''
  };
  render() {
    const { user_id, body } = this.state;
    const { article_id } = this.props;
    const apiURL = `/articles/${article_id}/comments`;
    return (
      <form className="commentAdderContainer">
        <label className="textAreaLabel" htmlFor="commentTextArea">Add a comment: </label>
        <textarea
          id="commentTextArea"
          rows="10"
          cols="110"
          value={this.state.body}
          name="body"
          onChange={this.handleCommentInput}
        />
        <button className="commentSubmitButton"
          type="submit"
          onClick={event => {
            this.submitComment(event, body, user_id, article_id, apiURL);
          }}
        >
          Submit
        </button>
      </form>
    );
  }

  handleCommentInput = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  componentDidMount = () => {
    const user_id = sessionStorage.getItem('userID');
    this.setState({
      user_id
    });
  };

  submitComment = (event, body, user, article, url) => {
    event.preventDefault();
    const newComment = {
      body,
      belongs_to: article,
      created_by: user
    };
    api.addComment(url, newComment).then(postedComment => {
      this.props.quickShowNewComment(postedComment);
      this.setState({
        body: ''
      });
    });
  };
}

CommentAdder.propTypes = {
  article_id: PropTypes.string.isRequired,
  quickShowNewComment: PropTypes.func.isRequired
};

export default CommentAdder;
