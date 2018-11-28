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
       this.setState({
         article,
         comments
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
   const num = direction === 'up' ? 1 : -1
   if (commentToUpdate[0].votes > 0 && num === -1) {
     commentToUpdate[0].votes += num
   } else if (num === 1) {
    commentToUpdate[0].votes += num
   }

   const updatedComments = [commentToUpdate[0], ...otherComments]
   
   this.setState({
     comments: updatedComments
   })
  }

  ammendArticle = (articleID, direction) => {
   //spread article object from state,
   //add direction to vote
   //set new object as state - causes a re-render
   console.log(articleID, direction)
  }
}

ArticleContainer.propTypes = {

};

export default ArticleContainer;