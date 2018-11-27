import React, { Component } from 'react';
import PropTypes from 'prop-types';

class VoteAdder extends Component {
  render() {
    const id = this.props.commentId ? this.props.commentId : this.props.articleId;
    const apiUrl = this.props.commentId ? `/comments/${id}` : `/articles/${id}`;
    return (
      <form>
        <button type="button" id={id} >Up Vote</button>
        <button type="button" id={id} >Down Vote</button>
      </form>
    );
  }
}

VoteAdder.propTypes = {

};

export default VoteAdder;