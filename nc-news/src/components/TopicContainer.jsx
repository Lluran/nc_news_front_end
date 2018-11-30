import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ArticlesContainer from './ArticlesContainer';
import * as api from '../api';
import { Link } from '@reach/router';
import './TopicContainer.css';
import './ArticlesContainer.css';

class TopicContainer extends Component {
  state = {
    relatedArticles: []
  };
  render() {
    const { relatedArticles } = this.state;
    const { slug } = this.props;
    return (
      <main className="headingAndArticles">
        <section className="topicHeadingBox">
          <h2 className="topicHeading">{slug}</h2>
          <Link to={`/${slug}/articles/post`}>
            {slug !== 'all articles' && (
              <button
                className="writeAnArticleButton"
                type=""
              >{`Write an article about ${slug}!`}</button>
            )}
          </Link>
        </section>
        <ArticlesContainer slug={slug} articles={relatedArticles} />
      </main>
    );
  }

  componentDidMount() {
    if (this.props.slug === 'all articles') {
      api.getArticles().then(articles => {
        this.setState({
          relatedArticles: articles
        });
      });
    } else {
      api.getArticlesByTopic(this.props.slug).then(articles => {
        this.setState({
          relatedArticles: articles
        });
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.slug !== this.props.slug) {
      if (this.props.slug === 'all articles') {
        api.getArticles().then(articles => {
          this.setState({
            relatedArticles: articles
          });
        });
      } else {
        api.getArticlesByTopic(this.props.slug).then(articles => {
          this.setState({
            relatedArticles: articles
          });
        });
      }
    }
  }
}

TopicContainer.propTypes = {
  slug: PropTypes.string
};

export default TopicContainer;
