import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from '../api';
import './VoteAdder.css'

class VoteAdder extends Component {
  state = {
    vote: ''
  };
  render() {
    const id = this.props.commentId
      ? this.props.commentId
      : this.props.articleId;
    const apiUrl = this.props.commentId ? `/comments/${id}` : `/articles/${id}`;
    return (
      <form className="votingButtons">
        <button
          type="button"
          value="up"
          id={id}
          onClick={event => {
            this.handleVote(event, apiUrl);
          }}
          disabled={this.state.vote === 'up'}
        className="voteUpButton">
          Up Vote
        </button>
        <button
          type="button"
          value="down"
          id={id}
          onClick={event => {
            this.handleVote(event, apiUrl);
          }}
          disabled={this.state.vote === 'down'}
          className="voteDownButton">
          Down Vote
        </button>
      </form>
    );
  }

  handleVote = (event, url) => {
    const { value, id } = event.target;
    const voteUrl = `${url}?vote=${value}`;
    api.patchVote(voteUrl).then(data => {
      if (this.props.articleId) {
        this.props.ammendArticle(value);
      } else {
        this.props.ammendComment(id, value);
      }
      this.setState({
        vote: value
      });
    });
  };
}

VoteAdder.propTypes = {
  commentId: PropTypes.string,
  articleId: PropTypes.string,
  ammendArticle: PropTypes.func,
  ammendComment: PropTypes.func
};

export default VoteAdder;
