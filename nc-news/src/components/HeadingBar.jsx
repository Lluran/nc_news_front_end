import React from 'react';
import PropTypes from 'prop-types';
import Login from './Login';

const HeadingBar = props => {
  return (
    <header>
      <img src='https://northcoders.com/images/logos/learn_to_code_manchester_rw_original.png' alt='Northcoders Logo'/>
      <img src='http://southernsynodurc.org.uk/wp-content/uploads/2015/12/News-Update-Logo.png' alt='News Update logo' />
      <Login/>
    </header>
  );
};

HeadingBar.propTypes = {
  
};

export default HeadingBar;