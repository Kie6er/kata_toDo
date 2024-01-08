import React, { useState, useRef, useEffect } from 'react';
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
  const [timer, setTimer] = useState(false);
  const { todoData } = data;
  const ref = useRef();

  useEffect(() => {
    ref.current = 1;
  }, []);
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

  const startTimer = (id) => {
    if (!timer) {
      setTimer(true);
      ref.current = setInterval(() => {
        editData(({ todoData }) => {
          const idx = todoData.findIndex((el) => el.id === id);
          if (idx === -1) {
            pauseTimer();
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
            pauseTimer();
            return {
              todoData: [...todoData],
            };
          }
          return {
            todoData: [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)],
          };
        });
      }, 1000);
    } else {
      return null;
    }
  };
  const pauseTimer = () => {
    clearInterval(ref.current);
    setTimer(false);
  };

  return (
    <section className="todoapp">
      <NewTaskForm onItemAdded={addItem} />
      <section className="main">
        <TaskList
          toDo={filteredTaskList}
          onDeleted={deleteItem}
          onToggleDone={onToggleDone}
          onToggleEdit={onToggleEdit}
          editLabel={editLabel}
          startTimer={startTimer}
          pauseTimer={pauseTimer}
        />
        <Footer count={todoCount} onClear={clearCompleted} filterValueSelected={onFilterTasks} />
      </section>
    </section>
  );
}

export default App;
