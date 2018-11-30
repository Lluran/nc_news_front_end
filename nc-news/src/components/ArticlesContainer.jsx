import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ArticleMini from './ArticleMini';
import './ArticlesContainer.css';

class ArticlesContainer extends Component {
  render() {
    const { articles } = this.props;
    const orderedArticles = articles.sort((a, b) => {
      if (Date.parse(a.created_at) > Date.parse(b.created_at)) {
        return -1;
      } else if (Date.parse(a.created_at) < Date.parse(b.created_at)) {
        return 1;
      } else {
        return 0;
      }
    });
    return (
      <section className="ArticlesContainer">
        {orderedArticles.map(article => {
          return <ArticleMini key={article._id} article={article} />;
        })}
      </section>
    );
  }
}

ArticlesContainer.propTypes = {
  articles: PropTypes.array.isRequired
};

export default ArticlesContainer;
