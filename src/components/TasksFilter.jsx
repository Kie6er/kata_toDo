import React from 'react'

const TasksFilter = ({onFilter}) => {
	function filter(evt) {
		onFilter(evt.target.innerText.toLowerCase());
		document.querySelectorAll('button.selected').forEach(el => el.classList.remove('selected'));
		evt.target.className = 'selected';
	}
	return (
		<ul className="filters">
			<li>
				<button className="selected" onClick={filter}>All</button>
			</li>
			<li>
				<button onClick={filter}>Active</button>
			</li>
			<li>
				<button onClick={filter}>Completed</button>
			</li>
		</ul>
	)
}

export default TasksFilter