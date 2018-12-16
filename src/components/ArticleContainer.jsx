import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ArticleMini from './ArticleMini';
import CommentAdder from './CommentAdder';
import CommentsContainer from './CommentsContainer';
import * as api from '../api';
import { Link, navigate } from '@reach/router';
import './CommentAdder.css';
import loading from '../assets/loading.svg';

class ArticleContainer extends Component {
  state = {
    article: {},
    comments: [],
    isLoading: true
  };
  render() {
    const { article, comments, isLoading } = this.state;
    const { article_id, user } = this.props;
    if (isLoading) {
      return (
        <div className="loading">
          <img className="loadingImg" src={loading} alt="loading logo" />
        </div>
      );
    }
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
            <Link className="loginReminderLink" to="/login">
              Login
            </Link>{' '}
            to post a comment!
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
          comments,
          isLoading: false
        });
      })
      .catch(() => {
        api
          .getArticleByID(this.props.article_id)
          .then(article => {
            this.setState({
              article,
              isLoading: false
            });
          })
          .catch(err => {
            const msg = err.response.data.msg;
            const code = err.response.status;
            navigate('/error', {
              replace: false,
              state: {
                code,
                msg
              }
            });
          });
      });
  }

  ammendComment = (commentID, direction) => {
    const prevComments = [...this.state.comments];
    const commentToUpdate = prevComments.filter(commentObj => {
      return commentObj._id === commentID;
    });
    const otherComments = prevComments.filter(commentObj => {
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
      comments: updatedComments,
      isLoading: false
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
      article: updatedArticle,
      isLoading: false
    });
  };

  quickShowNewComment = newComment => {
    const updatedComments = [newComment, ...this.state.comments];
    this.setState({
      comments: updatedComments,
      isLoading: false
    });
  };
}

ArticleContainer.propTypes = {
  article_id: PropTypes.string,
  user: PropTypes.string.isRequired
};

export default ArticleContainer;
