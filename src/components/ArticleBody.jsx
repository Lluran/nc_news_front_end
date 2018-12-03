import React from 'react';
import PropTypes from 'prop-types';
import './ArticleMini.css';

const ArticleBody = props => {
  return <p className="articleBody">{props.body}</p>;
};

ArticleBody.propTypes = {
  body: PropTypes.string.isRequired
};

export default ArticleBody;
