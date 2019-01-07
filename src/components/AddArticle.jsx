import React, { Component } from "react";
import PropTypes from "prop-types";
import * as api from "../api";
import { navigate, Link } from "@reach/router";
import "./AddArticle.css";

class AddArticle extends Component {
  state = {
    title: "",
    body: "",
    err: ""
  };
  render() {
    const { user } = this.props;
    const { err, title, body } = this.state;
    return (
      <main className="addArticleBox">
        <h2 className="addArticleHeading">Post a New Article</h2>
        {user.length > 0 && (
          <form
            action=""
            onSubmit={this.handleSubmit}
            className="addArticleForm"
          >
            {err.length > 0 && <p className="addArticleErrorMsg">{err}</p>}
            <label htmlFor="titleInput" className="addArticleLabel">
              Title:{" "}
            </label>
            <input
              className="addArticleContent"
              type="text"
              name="title"
              id="titleInput"
              value={title}
              onChange={this.handleInput}
            />
            <label htmlFor="articleBodyInput" className="addArticleLabel">
              Write your article here:{" "}
            </label>
            <textarea
              name="body"
              id="articleBodyInput"
              cols="30"
              rows="10"
              value={body}
              onChange={this.handleInput}
              className="addArticleContent"
            />
            <button className="commentSubmitButton" type="submit">
              Post Article!
            </button>
          </form>
        )}
        {user.length === 0 && (
          <p className="loginReminder">
            You need to{" "}
            <Link className="loginReminderLink" to="/login">
              login
            </Link>{" "}
            to post an article!
          </p>
        )}
      </main>
    );
  }

  handleInput = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.body.length === 0 || this.state.title.length === 0) {
      this.setState({
        err: "Your article needs a title and body!"
      });
    } else {
      const newArticle = {
        title: this.state.title,
        body: this.state.body,
        created_by: this.props.user
      };
      api
        .postArticle(newArticle, this.props.slug)
        .then(insertedArticle => {
          this.setState({
            err: ""
          });
          return navigate(`/topics/${this.props.slug}/articles`);
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
  };
}

AddArticle.propTypes = {
  user: PropTypes.string.isRequired
};

export default AddArticle;
