import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ArticlesContainer from './ArticlesContainer';
import * as api from '../api';
import { Link } from '@reach/router';

class TopicContainer extends Component {
  state = {
    relatedArticles: []
  };
  render() {
    const { relatedArticles } = this.state;
    const { slug } = this.props;
    return (
      <main>
        <section>
          <h2>{slug}</h2>
          <Link to={`/${slug}/articles/post`}>
            <input type="button" value={`Write an article about ${slug}!`} />
          </Link>
        </section>
        <ArticlesContainer articles={relatedArticles} />
      </main>
    );
  }

  componentDidMount() {
    api.getArticlesByTopic(this.props.slug).then(articles => {
      this.setState({
        relatedArticles: articles
      });
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.slug !== this.props.slug) {
      api.getArticlesByTopic(this.props.slug).then(articles => {
        this.setState({
          relatedArticles: articles
        });
      });
    }
  }
}

TopicContainer.propTypes = {
  slug: PropTypes.string
};

export default TopicContainer;
