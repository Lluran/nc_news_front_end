import React from 'react';
import PropTypes from 'prop-types';
import './ErrorHandler.css'

const ErrorHandler = props => {
  if (props.defaultCode) {
    return (<main className="errorContainer">
      <h1 className="errorCode">Error Code: 404</h1>
      <p className="errorMsg">Page Not Found</p>
    </main>)
  } else {
    const {code, msg} = props.location.state 
  return (
    <main className="errorContainer">
      <h1 className="errorCode">Error Code: {code}</h1>
      <p className="errorMsg">{msg}</p>
    </main>
  );}
};

ErrorHandler.propTypes = {
  
};

export default ErrorHandler;