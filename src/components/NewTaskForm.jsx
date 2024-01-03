import React, { useState } from 'react';
import PropTypes from 'prop-types';

const NewTaskForm = ({ onItemAdded }) => {
  const [label, editLabel] = useState('');
  const [minutes, editMinutes] = useState('');
  const [seconds, editSeconds] = useState('');
  const onLabelChange = (evt) => editLabel(evt.target.value);
  const onSubmit = (evt) => {
    evt.preventDefault();
    if (label !== '') {
      onItemAdded(label, minutes, seconds);
    }
    editLabel('');
    editMinutes('');
    editSeconds('');
  };

  const onChangeMinute = (event) => {
    editMinutes(Number(event.target.value));
  };

  const onChangeSecond = (event) => {
    editSeconds(Number(event.target.value));
  };
  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form" onSubmit={onSubmit}>
        <input className="new-todo" placeholder="Task" autoFocus onChange={onLabelChange} value={label} />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          autoFocus
          type="number"
          min={0}
          onChange={onChangeMinute}
          value={minutes}
          required
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          autoFocus
          type="number"
          onChange={onChangeSecond}
          value={seconds}
          min={1}
          max={59}
          required
        />
        <button type="submit" aria-label="Add new todo" />
      </form>
    </header>
  );
};

NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func.isRequired,
};

NewTaskForm.defaultProps = {
  onItemAdded: () => {},
};

export default NewTaskForm;
