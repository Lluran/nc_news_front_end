import React from 'react';
import ErrorHandler from './ErrorHandler';

const NotFound = props => {
  return (
    <ErrorHandler defaultCode={props.defaultCode}/>
  );
};


export default NotFound;
