import React, { useState } from 'react';

import './app.css';
import Footer from '../components/Footer';
import TaskList from '../components/TaskList';
import NewTaskForm from '../components/NewTaskForm';

function App() {
  const [data, editData] = useState({
    todoData: [],
  });
  const [filter, editFilter] = useState('all');
  const { todoData } = data;

  function createTodoItem(label) {
    return {
      label,
      done: false,
      edit: false,
      id: Math.random().toString(36).slice(2),
      date: new Date(),
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
  const addItem = (text) => {
    const newItem = createTodoItem(text);
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
      <div className="main">
        <TaskList
          toDo={filteredTaskList}
          onDeleted={deleteItem}
          onToggleDone={onToggleDone}
          onToggleEdit={onToggleEdit}
          editLabel={editLabel}
        />
        <Footer count={todoCount} onClear={clearCompleted} filterValueSelected={onFilterTasks} />
      </div>
    </section>
  );
}

export default App;
