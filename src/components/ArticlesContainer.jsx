import React, { Component } from "react";
import PropTypes from "prop-types";
import ArticleMini from "./ArticleMini";
import "./ArticlesContainer.css";
import loading from "../assets/loading.svg";
import { navigate } from "@reach/router/lib/history";
import * as api from "../api";

class ArticlesContainer extends Component {
  state = {
    articles: [],
    isLoading: true
  };
  render() {
    const { articles, isLoading } = this.state;
    if (isLoading) {
      return (
        <div className="loading">
          <img className="loadingImg" src={loading} alt="loading logo" />
        </div>
      );
    }
    return (
      <section className="ArticlesContainer">
        <label className="sortLabel" htmlFor="sort">
          Sort By:
          <select className="sort" onChange={event => this.handleSort(event)}>
            <option value="date">Date (Newest First)</option>
            <option value="rating">Rating (Highest Rated First)</option>
          </select>
        </label>
        {articles.map(article => {
          return <ArticleMini key={article._id} article={article} />;
        })}
      </section>
    );
  }
  componentDidMount() {
    if (this.props.user) {
      const { user } = this.props;
      api.getArticles().then(articles => {
        const userArticles = articles.filter(articleObj => {
          return articleObj.created_by.username === user.username;
        });
        this.setState({
          articles: userArticles,
          isLoading: false
        });
      });
    } else {
      if (this.props.slug === "all articles") {
        api.getArticles().then(articles => {
          const orderedByDateArticles = articles.sort((a, b) => {
            if (Date.parse(a.created_at) > Date.parse(b.created_at)) {
              return -1;
            } else if (Date.parse(a.created_at) < Date.parse(b.created_at)) {
              return 1;
            } else {
              return 0;
            }
          });
          this.setState({
            articles: orderedByDateArticles,
            isLoading: false
          });
        });
      } else {
        api
          .getArticlesByTopic(this.props.slug)
          .then(articles => {
            const orderedByDateArticles = articles.sort((a, b) => {
              if (Date.parse(a.created_at) > Date.parse(b.created_at)) {
                return -1;
              } else if (Date.parse(a.created_at) < Date.parse(b.created_at)) {
                return 1;
              } else {
                return 0;
              }
            });
            this.setState({
              articles: orderedByDateArticles,
              isLoading: false
            });
          })
          .catch(err => {
            const msg = err.response.data.msg;
            const code = err.response.status;
            navigate("/error", {
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

  componentDidUpdate(prevProps) {
    if (prevProps.slug !== this.props.slug) {
      if (this.props.userArticles) {
        this.setState({
          articles: this.props.userArticles,
          isLoading: false
        });
      } else {
        if (this.props.slug === "all articles") {
          api.getArticles().then(articles => {
            const orderedByDateArticles = articles.sort((a, b) => {
              if (Date.parse(a.created_at) > Date.parse(b.created_at)) {
                return -1;
              } else if (Date.parse(a.created_at) < Date.parse(b.created_at)) {
                return 1;
              } else {
                return 0;
              }
            });
            this.setState({
              articles: orderedByDateArticles,
              isLoading: false
            });
          });
        } else {
          api
            .getArticlesByTopic(this.props.slug)
            .then(articles => {
              const orderedByDateArticles = articles.sort((a, b) => {
                if (Date.parse(a.created_at) > Date.parse(b.created_at)) {
                  return -1;
                } else if (
                  Date.parse(a.created_at) < Date.parse(b.created_at)
                ) {
                  return 1;
                } else {
                  return 0;
                }
              });
              this.setState({
                articles: orderedByDateArticles,
                isLoading: false
              });
            })
            .catch(err => {
              const msg = err.response.data.msg;
              const code = err.response.status;
              navigate("/error", {
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

  handleSort = event => {
    const { value } = event.target;
    const articlesToSort = [...this.state.articles];
    let orderedArticles;
    if (value === "date") {
      orderedArticles = articlesToSort.sort((a, b) => {
        if (Date.parse(a.created_at) > Date.parse(b.created_at)) {
          return -1;
        } else if (Date.parse(a.created_at) < Date.parse(b.created_at)) {
          return 1;
        } else {
          return 0;
        }
      });
    } else {
      orderedArticles = articlesToSort.sort((a, b) => {
        if (a.votes > b.votes) {
          return -1;
        } else if (a.votes < b.votes) {
          return 1;
        } else {
          return 0;
        }
      });
    }
    this.setState({
      articles: orderedArticles
    });
  };
}

ArticlesContainer.propTypes = {
  slug: PropTypes.string
};

export default ArticlesContainer;
