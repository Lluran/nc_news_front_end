import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';

class CommentsContainer extends Component {
  render() {
    const {comments} = this.props;
    return (
      <section>
        {comments.map(commentObj => {
          return <Comment key={commentObj._id} comment={commentObj} ammendComment={this.props.ammendComment}/>
        })}
        
      </section>
    );
  }
}

CommentsContainer.propTypes = {

};

export default CommentsContainer;