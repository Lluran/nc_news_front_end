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
        {article._id && (<ArticleMini article={article} article_id={article_id} ammendArticle={this.ammendArticle}/>)}
        <CommentAdder/>
        {article._id &&  (<CommentsContainer comments={comments} ammendComment={this.ammendComment} />)}
      </section>
    );
  }

  componentDidMount () {
    return Promise.all([api.getArticleByID(this.props.article_id), api.getArticleComments(this.props.article_id)])
    .then(([article, comments]) => {
      console.log('hello')
       this.setState({
         article,
         comments
       })
    }).catch(() => {
      api.getArticleByID(this.props.article_id).then(article => {
        this.setState({
          article
        })
      })
    })
  }

  ammendComment = (commentID, direction)  => {
   const commentToUpdate = this.state.comments.filter(commentObj => {
     return commentObj._id === commentID;
   });
   const otherComments = this.state.comments.filter(commentObj => {
     return commentObj._id !== commentID;
   })
   let updatedComments = []
   const num = direction === 'up' ? 1 : -1
   if (commentToUpdate[0].votes > 0 && num === -1) {
     commentToUpdate[0].votes += num
     updatedComments = [commentToUpdate[0], ...otherComments]
   } else if (num === 1) {
    commentToUpdate[0].votes += num
    updatedComments = [commentToUpdate[0], ...otherComments]
   } else if (direction === 'delete') {
     updatedComments = [...otherComments]
   }

   this.setState({
     comments: updatedComments
   })
  }

  ammendArticle = (direction) => {
   const updatedArticle = {...this.state.article}
   const num = direction === 'up' ? 1 : -1
   if (updatedArticle.votes > 0 && num === -1) {
    updatedArticle.votes += num
  } else if (num === 1) {
   updatedArticle.votes += num
  }
  this.setState({
   article: updatedArticle
  })
  }
}

ArticleContainer.propTypes = {

};

export default ArticleContainer;