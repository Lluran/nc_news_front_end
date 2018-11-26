import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ArticleMini from './ArticleMini';
import CommentAdder from './CommentAdder';
import CommentsContainer from './CommentsContainer';

class ArticleContainer extends Component {
  render() {
    return (
      <section>
        <ArticleMini article_id={this.props.article_id}/>
        <CommentAdder/>
        <CommentsContainer/>
      </section>
    );
  }
}

ArticleContainer.propTypes = {

};

export default ArticleContainer;