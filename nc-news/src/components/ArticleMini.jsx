import React from 'react';
import PropTypes from 'prop-types';
import {Link} from '@reach/router'

const ArticleMini = props => {
  return (
    <article>
      <h3>Topic Name</h3>
      <h3>Author</h3>
      <Link to='articles/:article_id'>Article Title</Link>
      <p>Comment Count</p>
      <p>Vote Count</p>
    </article>
  );
};

ArticleMini.propTypes = {
  
};

export default ArticleMini;