import React, { useState } from 'react';
import './app.css';
import Footer from '../components/Footer';
import TaskList from '../components/TaskList';
import NewTaskForm from '../components/NewTaskForm';
const App = () => {
	const [data, editData] = useState({
		todoData: []
	})
	const [filter, editFilter] = useState('all')
	const { todoData } = data;

	function createTodoItem(label) {
		return {
			label,
			done: false,
			id: Math.random().toString(36).slice(2),
			date: new Date()
		}
	}
	const deleteItem = id => {
		editData(({ todoData }) => {
			const idx = todoData.findIndex(el => el.id === id);
			return {
				todoData: [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]
			}
		})
	}
	const addItem = text => {
		const newItem = createTodoItem(text);
		editData(({ todoData }) => {
			return {
				todoData: [...todoData, newItem]
			}
		})
	}
	const onToggleDone = id => {
		editData(({ todoData }) => {
			const idx = todoData.findIndex(el => el.id === id);
			const oldItem = todoData[idx]
			const newItem = { ...oldItem, done: !oldItem.done }
			return {
				todoData: [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]
			}
		})
	}
	const clearCompleted = () => {
		editData(({ todoData }) => {
			return {
				todoData: [...todoData.filter(el => !el.done)]
			}
		})
	}
	const onFilterTasks = filterValue => {
		editFilter(filterValue);
	}
	const filteredTaskList = todoData.filter(task =>
		filter === 'active' ? task.done === false : filter === 'completed' ? task.done === true : task
	)
	const doneCount = todoData.filter(el => el.done).length;
	const todoCount = todoData.length - doneCount;
	return (
		<section className="todoapp">
			<NewTaskForm onItemAdded={addItem} />
			<section className="main">
				<TaskList
					toDo={filteredTaskList}
					onDeleted={deleteItem}
					onToggleDone={onToggleDone}
				/>
				<Footer count={todoCount} onClear={clearCompleted} filterValueSelected={onFilterTasks} />
			</section>
		</section>
	)
}

export default App;
