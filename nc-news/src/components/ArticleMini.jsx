import React from 'react';
import PropTypes from 'prop-types';
import {Link, Router} from '@reach/router';
import './ArticleMini.css';
import ArticleBody from './ArticleBody';
import VoteAdder from './VoteAdder';

const ArticleMini = props => {
  const {belongs_to, body, comment_count, created_at, created_by, title, votes, _id} = props.article;
  const {username} = created_by;
  const dateCreated = new Date(Date.parse(created_at)).toDateString();
  
  return (
    <article className="articleMini">
      <p className="topicName">Topic: {belongs_to}</p>
      <p className="author">Author: <Link to={`/users/${username}`}>{username}</Link></p>
      <p className="commentcount">Comments: {comment_count}</p>
      <p className="votecount">Votes: {votes}</p>
      <Link className="articleTitle" to={`/articles/${_id}`}>{title}</Link>
      <p className="dateCreated">Written on: {dateCreated}</p>
       {props.article_id && (<ArticleBody body={body}/>)}
       {props.article_id && (<VoteAdder/>)}
    </article>
  );
};

ArticleMini.propTypes = {
  
};

export default ArticleMini;