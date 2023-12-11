import React from 'react';
import { formatDistanceToNow } from 'date-fns';

const Task = ({label, onDeleted, onToggleDone, done, date}) => {
	return (
		<li className={done ? 'completed': ''}>
			<div className="view">
				<input className="toggle" checked={done} type="checkbox" onChange={onToggleDone}/>
				<label>
					<span className="description">{label}</span>
					<span className="created">
						created {formatDistanceToNow(date, {
							includeSeconds: true,
							addSuffix: true,
						})}
					</span>
				</label>
				<button className="icon icon-edit"></button>
				<button className="icon icon-destroy" onClick={onDeleted}></button>
			</div>
			<form>
				<input type="text" className="edit" />
			</form>
		</li>
	);
};

export default Task