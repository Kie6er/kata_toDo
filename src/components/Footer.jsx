import React from 'react';
import PropTypes from 'prop-types';

import TasksFilter from './TasksFilter.jsx';

const Footer = ({ count = 0, onClear, filterValueSelected }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{count} items left</span>
      <TasksFilter onFilter={filterValueSelected} />
      <button className="clear-completed" onClick={() => onClear()}>
        Clear completed
      </button>
    </footer>
  );
};

Footer.propTypes = {
  count: PropTypes.number,
  onClear: PropTypes.func.isRequired,
  filterValueSelected: PropTypes.func.isRequired,
};

Footer.defaultProps = {
  count: 0,
  onClear: () => {},
  filterValueSelected: 'all',
};

export default Footer;
