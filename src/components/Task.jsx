import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

const Task = (props) => {
  const {
    label,
    onDeleted,
    onToggleDone,
    done,
    date,
    onToggleEdit,
    edit,
    id,
    editLabel,
    minutes,
    seconds,
    startTimer,
    pauseTimer,
  } = props;
  const [taskName, editTaskName] = useState(label);
  const onLabelChange = (evt) => editTaskName(evt.target.value);
  const onSubmitLabelEdit = (evt) => {
    evt.preventDefault();
    editLabel(id, taskName);
  };

  return (
    <li className={done ? 'completed' : edit ? 'editing' : ''}>
      <div className="view">
        <input className="toggle" checked={done} type="checkbox" onChange={onToggleDone} />
        <label>
          <span className="title">{label}</span>
          <span className="description">
            <button className="icon icon-play" type="button" aria-label="Start timer" onClick={startTimer} />
            <button className="icon icon-pause" type="button" aria-label="Pause timer" onClick={pauseTimer} />
            {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </span>
          <span className="description">
            created{' '}
            {formatDistanceToNow(date, {
              includeSeconds: true,
              addSuffix: true,
            })}
          </span>
        </label>
        <button className="icon icon-edit" onClick={onToggleEdit}></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
      </div>
      <form onSubmit={onSubmitLabelEdit}>
        <input type="text" className="edit" onChange={onLabelChange} value={taskName} />
      </form>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  done: PropTypes.bool,
  edit: PropTypes.bool,
  date: PropTypes.instanceOf(Date),
  onDeleted: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onToggleEdit: PropTypes.func.isRequired,
  editLabel: PropTypes.func.isRequired,
};

Task.defaultProps = {
  label: '',
  onDeleted: () => {},
  onToggleDone: () => {},
  onToggleEdit: () => {},
  editLabel: () => {},
  done: false,
  edit: false,
};

export default Task;
