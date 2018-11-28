import React from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';

const CommentsContainer = props => {
  const { comments } = props;
  const orderedComments = comments.sort((a, b) => {
    if (Date.parse(a.created_at) > Date.parse(b.created_at)) {
      return -1;
    } else if (Date.parse(a.created_at) < Date.parse(b.created_at)) {
      return 1;
    } else {
      return 0;
    }
  });
  return (
    <section>
      {orderedComments.map(commentObj => {
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
