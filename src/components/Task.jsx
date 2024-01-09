import React, { useEffect, useState, useRef } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

const Task = (props) => {
  const { label, onDeleted, onToggleDone, done, date, onToggleEdit, edit, id, editLabel, minutes, seconds, editData } =
    props;
  const [taskName, editTaskName] = useState(label);
  const onLabelChange = (evt) => editTaskName(evt.target.value);
  const onSubmitLabelEdit = (evt) => {
    evt.preventDefault();
    editLabel(id, taskName);
  };
  const ref = useRef();
  const [timer, setTimer] = useState(true);
  useEffect(() => {
    ref.current = 1;
  }, []);
  useEffect(() => {
    if (timer && !done) {
      ref.current = setInterval(() => {
        editData(({ todoData }) => {
          const idx = todoData.findIndex((el) => el.id === id);
          if (idx === -1) {
            clearInterval(ref.current);
            return {
              todoData: [...todoData],
            };
          }
          let oldItem = todoData[idx];
          let newItem = { ...oldItem, seconds: oldItem.seconds - 1 };
          if (newItem.seconds < 0) {
            newItem = { ...newItem, minutes: oldItem.minutes - 1, seconds: 59 };
          }
          if (newItem.minutes < 0) {
            clearInterval(ref.current);
            return {
              todoData: [...todoData],
            };
          }
          return {
            todoData: [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)],
          };
        });
      }, 1000);
    } else if (!timer && done) {
      clearInterval(ref.current);
    }

    return () => {
      clearInterval(ref.current);
    };
  }, [timer, done]);

  return (
    <li className={done ? 'completed' : edit ? 'editing' : ''}>
      <div className="view">
        <input className="toggle" checked={done} type="checkbox" onChange={onToggleDone} />
        <label>
          <span className="title">{label}</span>
          <span className="description">
            <button className="icon icon-play" type="button" aria-label="Start timer" onClick={() => setTimer(true)} />
            <button
              className="icon icon-pause"
              type="button"
              aria-label="Pause timer"
              onClick={() => setTimer(false)}
            />
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
