import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ArticleMini from './ArticleMini';
import CommentAdder from './CommentAdder';
import CommentsContainer from './CommentsContainer';
import * as api from '../api';
import { Link } from '@reach/router';
import './CommentAdder.css'

class ArticleContainer extends Component {
  state = {
    article: {},
    comments: [],
  };
  render() {
    const { article, comments } = this.state;
    const { article_id, user } = this.props;
    return (
      <section className="articleContainer">
        {article._id && (
          <ArticleMini
            article={article}
            article_id={article_id}
            ammendArticle={this.ammendArticle}
          />
        )}
        {user.length > 0 && (
          <CommentAdder
            quickShowNewComment={this.quickShowNewComment}
            article_id={article_id}
          />
        )}
        {user.length === 0 && (
          <p className="loginReminder">
            <Link className="loginReminderLink" to="/login">Login</Link> to post a comment!
          </p>
        )}
        {article._id && (
          <CommentsContainer
            comments={comments}
            ammendComment={this.ammendComment}
          />
        )}
      </section>
    );
  }

  componentDidMount() {
    return Promise.all([
      api.getArticleByID(this.props.article_id),
      api.getArticleComments(this.props.article_id)
    ])
      .then(([article, comments]) => {
        this.setState({
          article,
          comments
        });
      })
      .catch(() => {
        api.getArticleByID(this.props.article_id).then(article => {
          this.setState({
            article
          });
        }).catch(err => {
          const {msg} = err.response.data;
          //Do something with message - pass though navigate as second argument after replace
        })
      });
  }

  ammendComment = (commentID, direction) => {
    const commentToUpdate = this.state.comments.filter(commentObj => {
      return commentObj._id === commentID;
    });
    const otherComments = this.state.comments.filter(commentObj => {
      return commentObj._id !== commentID;
    });
    let updatedComments = [];
    const num = direction === 'up' ? 1 : -1;
    if (commentToUpdate[0].votes > 0 && direction === 'down') {
      commentToUpdate[0].votes += num;
      updatedComments = [commentToUpdate[0], ...otherComments];
    } else if (num === 1) {
      commentToUpdate[0].votes += num;
      updatedComments = [commentToUpdate[0], ...otherComments];
    } else if (direction === 'delete') {
      updatedComments = [...otherComments];
    }

    this.setState({
      comments: updatedComments
    });
  };

  ammendArticle = direction => {
    const updatedArticle = { ...this.state.article };
    const num = direction === 'up' ? 1 : -1;
    if (updatedArticle.votes > 0 && num === -1) {
      updatedArticle.votes += num;
    } else if (num === 1) {
      updatedArticle.votes += num;
    }
    this.setState({
      article: updatedArticle
    });
  };

  quickShowNewComment = newComment => {
    const updatedComments = [newComment, ...this.state.comments];
    this.setState({
      comments: updatedComments
    });
  };
}

ArticleContainer.propTypes = {
  article_id: PropTypes.string,
  user: PropTypes.string.isRequired
};

export default ArticleContainer;
