import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ArticleMini from './ArticleMini';

class ArticlesContainer extends Component {
  render() {
    return (
      <section className="ArticlesContainer" >
        <ArticleMini/>
        <ArticleMini/>
      </section>
    );
  }
}

ArticlesContainer.propTypes = {

};

export default ArticlesContainer;