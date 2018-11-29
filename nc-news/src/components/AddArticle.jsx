import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from '../api';
import { navigate, Link } from '@reach/router';

class AddArticle extends Component {
  state = {
    title: '',
    body: '',
    err: ''
  };
  render() {
    const { user } = this.props;
    const { err } = this.state;
    return (
      <main>
        <h2>Post a New Article</h2>
        {user.length > 0 && (
          <form action="" onSubmit={this.handleSubmit}>
            {err.length > 0 && <p className="addArticleErrorMsg">{err}</p>}
            <label htmlFor="titleInput">Title: </label>
            <input
              type="text"
              name="title"
              id="titleInput"
              value={this.state.title}
              onChange={this.handleInput}
            />
            <label htmlFor="articleBodyInput">Write your article here: </label>
            <textarea
              name="body"
              id="articleBodyInput"
              cols="30"
              rows="10"
              value={this.state.body}
              onChange={this.handleInput}
            >
              Write your article here!
            </textarea>
            <button type="submit">Post Article!</button>
          </form>
        )}
        {user.length === 0 && (
          <p>
            You need to <Link to="/login">login</Link> to post an article!
          </p>
        )}
      </main>
    );
  }

  handleInput = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.body.length === 0 || this.state.title.length === 0) {
      this.setState({
        err: 'Your article needs a title and body!'
      });
    } else {
      const newArticle = {
        title: this.state.title,
        body: this.state.body,
        created_by: this.props.user
      };
      api
        .postArticle(newArticle, this.props.slug)
        .then(insertedArticle => {
          this.setState({
            err: ''
          })
          return navigate(`/topics/${this.props.slug}/articles`);
        })
        .then(postedArticle => {
          this.props.updateArticles(postedArticle);
        });
    }
  };
}

AddArticle.propTypes = {
  user: PropTypes.string.isRequired,
  updateArticles: PropTypes.func.isRequired
};

export default AddArticle;
