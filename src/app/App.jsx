import React, { useState } from 'react';
import { nanoid } from 'nanoid';

import './App.css';
import Footer from '../components/Footer.jsx';
import TaskList from '../components/TaskList.jsx';
import NewTaskForm from '../components/NewTaskForm.jsx';

function App() {
  const [data, editData] = useState({
    todoData: [],
  });
  const [filter, editFilter] = useState('all');
  const { todoData } = data;

  function createTodoItem(label, min, sec) {
    return {
      label,
      done: false,
      edit: false,
      id: nanoid(),
      date: new Date(),
      minutes: min,
      seconds: sec,
    };
  }
  const deleteItem = (id) => {
    editData(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      return {
        todoData: [...todoData.slice(0, idx), ...todoData.slice(idx + 1)],
      };
    });
  };
  const addItem = (label, min, sec) => {
    const newItem = createTodoItem(label, min, sec);
    editData(({ todoData }) => ({
      todoData: [...todoData, newItem],
    }));
  };
  const onToggleDone = (id) => {
    editData(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[idx];
      const newItem = { ...oldItem, done: !oldItem.done };
      return {
        todoData: [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)],
      };
    });
  };
  const onToggleEdit = (id) => {
    editData(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[idx];
      const newItem = { ...oldItem, edit: !oldItem.edit };
      return {
        todoData: [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)],
      };
    });
  };
  const clearCompleted = () => {
    editData(({ todoData }) => ({
      todoData: [...todoData.filter((el) => !el.done)],
    }));
  };
  const onFilterTasks = (filterValue) => {
    editFilter(filterValue);
  };
  const editLabel = (id, text) => {
    editData(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[idx];
      const newItem = { ...oldItem, edit: !oldItem.edit, label: text };
      return {
        todoData: [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)],
      };
    });
  };
  const filteredTaskList = todoData.filter((task) =>
    filter === 'active' ? task.done === false : filter === 'completed' ? task.done === true : task
  );
  const doneCount = todoData.filter((el) => el.done).length;
  const todoCount = todoData.length - doneCount;

  return (
    <section className="todoapp">
      <NewTaskForm onItemAdded={addItem} />
      <section className="main">
        <TaskList
          editData={editData}
          toDo={filteredTaskList}
          onDeleted={deleteItem}
          onToggleDone={onToggleDone}
          onToggleEdit={onToggleEdit}
          editLabel={editLabel}
        />
        <Footer count={todoCount} onClear={clearCompleted} filterValueSelected={onFilterTasks} />
      </section>
    </section>
  );
}

export default App;
