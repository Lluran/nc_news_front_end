import React from "react";
import PropTypes from "prop-types";
import ArticlesContainer from "./ArticlesContainer";
import { Link } from "@reach/router";
import "./TopicContainer.css";
import "./ArticlesContainer.css";

const TopicContainer = props => {
  const { slug } = props;
  return (
    <main className="headingAndArticles">
      <section className="topicHeadingBox">
        <h2 className="topicHeading">{slug}</h2>
        <Link to={`/${slug}/articles/post`}>
          {slug !== "all articles" && (
            <button
              className="writeAnArticleButton"
              type=""
            >{`Write an article about ${slug}!`}</button>
          )}
        </Link>
      </section>
      <ArticlesContainer slug={slug} />
    </main>
  );
};

TopicContainer.propTypes = {
  slug: PropTypes.string
};

export default TopicContainer;
