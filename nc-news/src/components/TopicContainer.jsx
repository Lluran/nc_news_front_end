import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ArticlesContainer from './ArticlesContainer';
import * as api from '../api';

class TopicContainer extends Component {
  state = {
    relatedArticles: []
  };
  render() {
    const {relatedArticles} = this.state;
    return (
      <main>
        <h2>Topic Heading Goes Here</h2>
        <ArticlesContainer articles={relatedArticles}/>
      </main>
    );
  }

  // setTopicArticles = (topic) => {
  //   const articles = [...this.props.articles]
  //   const relatedArticles = articles.filter(articleObj => {
  //     return articleObj.belongs_to === topic;
  //   });
  //   return relatedArticles;
  // }

  componentDidMount() {
    api.getArticlesByTopic(this.props.slug)
    .then(articles => {
      this.setState({
        relatedArticles: articles
      })
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.slug !== this.props.slug) {
      api.getArticlesByTopic(this.props.slug).then(articles => {
        this.setState({
          relatedArticles: articles
        })
      });
    }
  }
}

TopicContainer.propTypes = {};

export default TopicContainer;
