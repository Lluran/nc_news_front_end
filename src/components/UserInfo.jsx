import React, { Component } from "react";
import PropTypes from "prop-types";
import ArticlesContainer from "./ArticlesContainer";
import User from "./User";
import * as api from "../api";
import "./Comments.css";
import "./User.css";
import { navigate } from "@reach/router";
import loading from "../assets/loading.svg";

class UserInfo extends Component {
  state = {
    user: {},
    isLoading: true
  };
  render() {
    const { user, isLoading } = this.state;
    if (isLoading) {
      return (
        <div className="loading">
          <img className="loadingImg" src={loading} alt="loading logo" />
        </div>
      );
    }
    return (
      <section className="userContainer">
        <User user={user} />
        <ArticlesContainer user={user} />
      </section>
    );
  }

  componentDidMount() {
    api
      .getUser(this.props.username)
      .then(user => {
        this.setState({
          user,
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

UserInfo.propTypes = {
  username: PropTypes.string
};

export default UserInfo;
