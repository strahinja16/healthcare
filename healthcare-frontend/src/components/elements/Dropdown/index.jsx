
import React from 'react';
import { Dropdown as SemanticDropdown } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const Dropdown = ({ search, placeholder, options, handleOnChange, handleOnSearchChange }) => (
  <SemanticDropdown
    onChange={handleOnChange}
    onSearchChange={handleOnSearchChange}
    placeholder={placeholder}
    fluid
    search={search}
    selection
    options={options}
  />
);

Dropdown.defaultProps = {
  search: false,
  handleOnSearchChange: () => {},
};

Dropdown.propTypes = {
  placeholder: PropTypes.string.isRequired,
  search: PropTypes.bool,
  handleOnChange: PropTypes.func.isRequired,
  handleOnSearchChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      value: PropTypes.string,
    }),
  ).isRequired,
};

export default Dropdown;
