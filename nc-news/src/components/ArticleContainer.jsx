import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ArticleMini from './ArticleMini';
import CommentAdder from './CommentAdder';
import CommentsContainer from './CommentsContainer';
import * as api from '../api'

class ArticleContainer extends Component {
  state = {
    article: {}
  }
  render() {
    const {article} = this.state;
    const {article_id} = this.props;
    return (
      <section>
        {article._id && (<ArticleMini article={article} article_id={article_id}/>)}
        <CommentAdder/>
        <CommentsContainer/>
      </section>
    );
  }

  componentDidMount () {
    api.getArticleByID(this.props.article_id)
    .then(article => {
      this.setState({
        article
      })
    })
  }
}

ArticleContainer.propTypes = {

};

export default ArticleContainer;