import React from "react";
import "./TodoList.scss";
import TodoListItem from "./TodoListitem";

const TodoList = ({todos, onRemove, onToggle}) => {
	return (
		<div className="TodoList">
			{todos.map(todo => (
				<TodoListItem todo={todo} key={todo.id} onRemove={onRemove} onToggle={onToggle}/>
			))}
		</div>
	);
};

export default TodoList;