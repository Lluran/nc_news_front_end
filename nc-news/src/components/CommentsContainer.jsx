import React from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';

const CommentsContainer = props => {
  const { comments } = props;
  return (
    <section>
      {comments.map(commentObj => {
        return (
          <Comment
            key={commentObj._id}
            comment={commentObj}
            ammendComment={props.ammendComment}
          />
        );
      })}
      {comments.length === 0 && <p>Be the first to comment on this article!</p>}
    </section>
  );
};

CommentsContainer.propTypes = {
  comments: PropTypes.array.isRequired,
  ammendComment: PropTypes.func.isRequired
};

export default CommentsContainer;
