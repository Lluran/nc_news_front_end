import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ArticleMini from './ArticleMini';
import CommentAdder from './CommentAdder';
import CommentsContainer from './CommentsContainer';
import * as api from '../api'

class ArticleContainer extends Component {
  state = {
    article: {},
    comments: []
  }
  render() {
    const {article, comments} = this.state;
    const {article_id} = this.props;
    return (
      <section>
        {article._id && (<ArticleMini article={article} article_id={article_id}/>)}
        <CommentAdder/>
        {article._id &&  (<CommentsContainer comments={comments}/>)}
      </section>
    );
  }

  componentDidMount () {
    return Promise.all([api.getArticleByID(this.props.article_id), api.getArticleComments(this.props.article_id)])
    .then(([article, comments]) => {
       this.setState({
         article,
         comments
       })
    })

  }
}

ArticleContainer.propTypes = {

};

export default ArticleContainer;