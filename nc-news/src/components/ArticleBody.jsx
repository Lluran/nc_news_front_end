import React from 'react';
import PropTypes from 'prop-types';

const ArticleBody = props => {
  return <p>{props.body}</p>;
};

ArticleBody.propTypes = {
  body: PropTypes.string.isRequired
};

export default ArticleBody;
