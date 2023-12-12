import React from 'react';
import PropTypes from 'prop-types';

import Task from './Task';

const TaskList = ({ toDo, onDeleted, onToggleDone, onToggleEdit, editLabel }) => {
  const elements = toDo.map((item) => {
    return (
      <Task
        key={item.id}
        {...item}
        onDeleted={() => onDeleted(item.id)}
        onToggleDone={() => onToggleDone(item.id)}
        onToggleEdit={() => onToggleEdit(item.id)}
        editLabel={editLabel}
      />
    );
  });
  return <ul className="todo-list">{elements}</ul>;
};

TaskList.propTypes = {
  toDo: PropTypes.array,
  onDeleted: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onToggleEdit: PropTypes.func.isRequired,
  editLabel: PropTypes.func.isRequired,
};

TaskList.defaultProps = {
  toDo: [],
  onDeleted: () => {},
  onToggleDone: () => {},
  onToggleEdit: () => {},
  editLabel: () => {},
};

export default TaskList;
