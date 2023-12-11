import React from 'react'
import TasksFilter from './TasksFilter'

const Footer = ({count, onClear, filterValueSelected}) => {
	return (
		<footer className="footer">
			<span className="todo-count">{count} items left</span>
			<TasksFilter onFilter={filterValueSelected}/>
			<button className="clear-completed" onClick={ () => onClear()}>Clear completed</button>
		</footer>
	)
}

export default Footer