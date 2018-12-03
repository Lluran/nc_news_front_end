import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ArticlesContainer from './ArticlesContainer';
import * as api from '../api';
import { Link } from '@reach/router';
import './TopicContainer.css';
import './ArticlesContainer.css';
import { navigate } from '@reach/router/lib/history';
import loading from '../assets/loading.svg'

class TopicContainer extends Component {
  state = {
    relatedArticles: [],
    isLoading: true
  };
  render() {
    const { relatedArticles, isLoading } = this.state;
    const { slug } = this.props;
    if (isLoading) {
      return (<div className="loading"><img className="loadingImg" src={loading} alt='loading logo'/></div>)
    }
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
          relatedArticles: articles,
          isLoading: false
        });
      });
    } else {
      api
        .getArticlesByTopic(this.props.slug)
        .then(articles => {
          this.setState({
            relatedArticles: articles,
            isLoading: false
          });
        })
        .catch(err => {
          const msg = err.response.data.msg;
          const code = err.response.status;
          navigate('/error', {
            replace: false,
            state: {
              code,
              msg
            }
          });
        });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.slug !== this.props.slug) {
      if (this.props.slug === 'all articles') {
        api.getArticles().then(articles => {
          this.setState({
            relatedArticles: articles,
            isLoading: false
          });
        });
      } else {
        api
          .getArticlesByTopic(this.props.slug)
          .then(articles => {
            this.setState({
              relatedArticles: articles,
              isLoading: false
            });
          })
          .catch(err => {
            const msg = err.response.data.msg;
            const code = err.response.status;
            navigate('/error', {
              replace: false,
              state: {
                code,
                msg
              }
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
