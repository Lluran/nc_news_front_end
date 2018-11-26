import React from 'react';
import PropTypes from 'prop-types';
import {Link} from '@reach/router';
import './ArticleMini.css';

const ArticleMini = props => {
  return (
    <article className="articleMini">
      <h3 className="topicName">Topic Name</h3>
      <h3 className="author">Author</h3>
      <p className="commentcount">Comment Count</p>
      <p className="votecount">Vote Count</p>
      <Link className="articleTitle" to='articles/:article_id'>Article Title</Link>
    </article>
  );
};

ArticleMini.propTypes = {
  
};

export default ArticleMini;