import React from 'react';
import PropTypes from 'prop-types';
import ErrorHandler from './ErrorHandler';

const NotFound = props => {
  return (
    <ErrorHandler defaultCode={props.defaultCode}/>
  );
};

NotFound.propTypes = {};

export default NotFound;
