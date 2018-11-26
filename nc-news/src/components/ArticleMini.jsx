import React from 'react';
import PropTypes from 'prop-types';
import {Link, Router} from '@reach/router';
import './ArticleMini.css';
import ArticleBody from './ArticleBody';
import VoteAdder from './VoteAdder';

const ArticleMini = props => {
  return (
    
    <article className="articleMini">
      <h3 className="topicName">Topic Name</h3>
      <Link to='/users/:username'><h3 className="author">Author</h3></Link>
      <p className="commentcount">Comment Count</p>
      <p className="votecount">Vote Count</p>
      <Link className="articleTitle" to='/articles/:article_id'>Article Title</Link>
       {props.article_id && (<ArticleBody path="/articles/:article_id"/>)}
       {props.article_id && (<VoteAdder/>)}
    </article>
  );
};

ArticleMini.propTypes = {
  
};

export default ArticleMini;