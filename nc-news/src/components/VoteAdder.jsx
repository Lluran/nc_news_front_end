import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from '../api'

class VoteAdder extends Component {
  render() {
    const id = this.props.commentId ? this.props.commentId : this.props.articleId;
    const apiUrl = this.props.commentId ? `/comments/${id}` : `/articles/${id}`;
    return (
      <form>
        <button type="button" value="up" id={id} onClick={(event)=> {this.handleVote(event, apiUrl)}}>Up Vote</button>
        <button type="button" value="down" id={id} onClick={(event)=> {this.handleVote(event, apiUrl)}}>Down Vote</button>
      </form>
    );
  }

  handleVote = (event, url) => {
    const {value, id} = event.target;
    const voteUrl = `${url}?vote=${value}`
    api.patchVote(voteUrl)
    .then((data) => {
     if (this.props.articleId) {
       this.props.ammendArticle(id, value)
     } else {
       this.props.ammendComment(id, value)
     }
    })
  }
}

VoteAdder.propTypes = {

};

export default VoteAdder;