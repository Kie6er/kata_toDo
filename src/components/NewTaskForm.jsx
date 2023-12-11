import React, { useState } from 'react'

const NewTaskForm = ({onItemAdded}) => {
	const [label, editLabel] = useState('');
	const onLabelChange = evt => editLabel(evt.target.value);
	const onSubmit = evt => {
		evt.preventDefault();
		if(label !== '') {
			onItemAdded(label);
		}
		editLabel('');
	}
	return (
		<form className="header" onSubmit={onSubmit}>
			<h1>todos</h1>
			<input
				className="new-todo"
				placeholder="What needs to be done?"
				autoFocus
				onChange={onLabelChange}
				value={label}
				/>
				
		</form>
	)
}

export default NewTaskForm