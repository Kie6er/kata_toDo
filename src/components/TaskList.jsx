import React from 'react'
import Task from './Task'

const TaskList = ({toDo, onDeleted, onToggleDone}) => {
	const elements = toDo.map(item => {
		const { id, ...itemProps } = item;
		return <Task
					key={id}
					{...itemProps}
					onDeleted={ () => onDeleted(id) }
					onToggleDone={ () => onToggleDone(id) }
				/>
	})
	return (
		<ul className="todo-list">
			{elements}
		</ul>
	)
}

export default TaskList