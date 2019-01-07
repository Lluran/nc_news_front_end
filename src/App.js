import React, { Component } from "react";
import "./App.css";
import HeadingBar from "./components/HeadingBar";
import TopicSelector from "./components/TopicSelector";
import { Router, navigate } from "@reach/router";
import TopicContainer from "./components/TopicContainer";
import ArticleContainer from "./components/ArticleContainer";
import UserInfo from "./components/UserInfo";
import NewLogin from "./components/NewLogin";
import AddArticle from "./components/AddArticle";
import NotFound from "./components/NotFound";
import ErrorHandler from "./components/ErrorHandler";

class App extends Component {
  state = {
    _id: "",
    user: ""
  };
  render() {
    const { _id, user } = this.state;
    return (
      <div className="App">
        <HeadingBar user={user} clearUser={this.clearUser} />
        <TopicSelector />
        <Router className="mainBody">
          <TopicContainer slug={"all articles"} path="/" />
          <TopicContainer path="/topics/:slug/articles" />
          <ArticleContainer user={user} path="/articles/:article_id" />
          <UserInfo path="/users/:username" />
          <AddArticle user={_id} path="/:slug/articles/post" />
          <NewLogin login={this.login} path="/login" />
          <ErrorHandler path="/error" />
          <NotFound defaultCode={"404"} default />
        </Router>
      </div>
    );
  }

  componentDidMount() {
    const _id = sessionStorage.getItem("userID");
    const user = sessionStorage.getItem("user");
    if (_id !== null) {
      this.setState({
        user,
        _id
      });
    }
  }

  login = (_id, user) => {
    sessionStorage.setItem("userID", _id);
    sessionStorage.setItem("user", user);
    this.setState({
      _id,
      user
    });
  };

  clearUser = () => {
    sessionStorage.clear();
    this.setState({
      _id: "",
      user: ""
    });
    navigate("/");
  };
}

export default App;
