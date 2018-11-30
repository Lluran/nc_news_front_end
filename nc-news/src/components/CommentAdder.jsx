import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from '../api';
import './CommentAdder.css';

class CommentAdder extends Component {
  state = {
    body: '',
    user_id: '',
    err: ''
  };
  render() {
    const { user_id, body, err } = this.state;
    const { article_id } = this.props;
    const apiURL = `/articles/${article_id}/comments`;
    return (
      <form className="commentAdderContainer">
        {err.length > 0 && <p className="textAreaLabel">{err}</p>}
        <label className="textAreaLabel" htmlFor="commentTextArea">
          Add a comment:{' '}
        </label>
        <textarea
          id="commentTextArea"
          rows="10"
          cols="30"
          value={this.state.body}
          name="body"
          onChange={this.handleCommentInput}
        />
        <button
          className="commentSubmitButton"
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
    if (body.length === 0) {
      this.setState({
        err: 'No comment to submit!'
      });
    } else {
      const newComment = {
        body,
        belongs_to: article,
        created_by: user
      };
      api.addComment(url, newComment).then(postedComment => {
        this.props.quickShowNewComment(postedComment);
        this.setState({
          body: '',
          err: ''
        });
      });
    }
  };
}

CommentAdder.propTypes = {
  article_id: PropTypes.string.isRequired,
  quickShowNewComment: PropTypes.func.isRequired
};

export default CommentAdder;
