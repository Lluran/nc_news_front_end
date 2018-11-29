import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import './ArticleMini.css';
import ArticleBody from './ArticleBody';
import VoteAdder from './VoteAdder';

const ArticleMini = props => {
  const {
    belongs_to,
    body,
    comment_count,
    created_at,
    created_by,
    title,
    votes,
    _id
  } = props.article;
  const { username } = created_by;
  const dateCreated = new Date(Date.parse(created_at)).toDateString();

  return (
    <article className="articleMini">
      <p className="topicName">Topic: <strong>{belongs_to}</strong></p>
      <p className="author">
        Author: <Link to={`/users/${username}`}><strong className="usernameOnArticleMini">{username}</strong></Link>
      </p>
      <p className="commentcount">Comments: <strong>{comment_count}</strong></p>
      <p className="votecount">Votes: <strong>{votes}</strong></p>
      <Link className="articleTitle" to={`/articles/${_id}`}>
        {title}
      </Link>
      <p className="dateCreated">Written on: <strong>{dateCreated}</strong></p>
      {props.article_id && <ArticleBody  body={body} />}
      {props.article_id && (
        <VoteAdder ammendArticle={props.ammendArticle} articleId={_id} />
      )}
    </article>
  );
};

ArticleMini.propTypes = {
  article_id: PropTypes.string,
  ammendArticle: PropTypes.func,
  article: PropTypes.object.isRequired
};

export default ArticleMini;
