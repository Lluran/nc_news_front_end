import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VoteAdder from './VoteAdder';
import * as api from '../api';
import './Comments.css'

class Comment extends Component {
  state = {
    user: ''
  };
  render() {
    const { user } = this.state;
    const { comment, ammendComment } = this.props;
    const { votes, body, created_at, created_by, _id } = comment;
    const { username } = created_by;
    const dateCreated = new Date(Date.parse(created_at)).toDateString();
    return (
      <section className="commentBox">
        <p className="commentBody">{body}</p>
        <p className="commentAuthor">Written by: <strong className="usernameOnArticleMini">{username}</strong></p>
        <p className="commentDate">{dateCreated}</p>
        <p className="commentVotes" >Votes: <strong>{votes}</strong></p>
        <div className="commentButtons">{user === username && (
          <button className="deleteCommentButton" type="button" id={_id} onClick={this.handleDelete}>
            Delete Comment
          </button>
        )}
        <VoteAdder ammendComment={ammendComment} commentId={_id} /></div>
      </section>
    );
  }
  componentDidMount() {
    const user = sessionStorage.getItem('user');
    if (user) {
      this.setState({
        user
      });
    }
  }

  handleDelete = event => {
    const { id } = event.target;
    const apiUrl = `/comments/${id}`;
    api.deleteData(apiUrl).then(data => {
      this.props.ammendComment(id, 'delete');
    });
  };
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  ammendComment: PropTypes.func.isRequired
};

export default Comment;
