import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from '../api';
import {navigate} from '@reach/router'

class AddArticle extends Component {
  state = {
    title: '',
    body: ''
  };
  render() {
    return (
      <main>
        <h2>Post a New Article</h2>
        <form action="" onSubmit={this.handleSubmit}>
          <label htmlFor="titleInput">Title: </label>
          <input
            type="text"
            name="title"
            id="titleInput"
            value={this.state.title}
            onChange={this.handleInput}
          />
          <label htmlFor="articleBodyInput" />
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
      </main>
    );
  }

  handleInput = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const newArticle = {
      title : this.state.title,
      body : this.state.body,
      created_by: this.props.user
    };
   api.postArticle(newArticle, this.props.slug)
   .then(insertedArticle => {
     navigate(`/topics/${this.props.slug}/articles`)
   })
  }

  // {
  //   "title": "new article",
  //   "body": "This is my new article content",
  //   "created_by": `${userDocs[0]._id}`
  // }
}

AddArticle.propTypes = {};

export default AddArticle;