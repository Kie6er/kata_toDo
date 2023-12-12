import React from 'react';
import PropTypes from 'prop-types';

const TasksFilter = ({ onFilter }) => {
  function filter(evt) {
    onFilter(evt.target.innerText.toLowerCase());
    document.querySelectorAll('button.selected').forEach((el) => el.classList.remove('selected'));
    evt.target.className = 'selected';
  }
  return (
    <ul className="filters">
      <li>
        <button className="selected" onClick={filter}>
          All
        </button>
      </li>
      <li>
        <button onClick={filter}>Active</button>
      </li>
      <li>
        <button onClick={filter}>Completed</button>
      </li>
    </ul>
  );
};

TasksFilter.propTypes = {
  onFilter: PropTypes.func.isRequired,
};

TasksFilter.defaultProps = {
  onFilter: () => {},
};
export default TasksFilter;
