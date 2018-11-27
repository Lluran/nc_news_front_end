import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ArticleMini from './ArticleMini';

class ArticlesContainer extends Component {
  
  render() {
    const {articles} = this.props;
    return (
      <section className="ArticlesContainer" >
        {articles.map(article => {
          return <ArticleMini key={article._id} article={article} />
        })}
      </section>
    );
  }
}

ArticlesContainer.propTypes = {

};

export default ArticlesContainer;