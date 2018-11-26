import React, { Component } from 'react';
import PropTypes from 'prop-types';

class VoteAdder extends Component {
  render() {
    return (
      <form>
        <button type="button">Up Vote</button>
        <button type="button">Down Vote</button>
      </form>
    );
  }
}

VoteAdder.propTypes = {

};

export default VoteAdder;