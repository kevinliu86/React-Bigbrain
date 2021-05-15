import React from 'react';
import PropTypes from 'prop-types';

function Title ({ title }) {
  return <h1>{title}</h1>;
}
Title.propTypes = {
  title: PropTypes.string,
};

export default Title;
