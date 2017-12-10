//@flow
import React from 'react'
import type {TodoItemProps} from "../definitions/TodoTypeDefinition";


const TodoItem = ({title, isCompleted, onItemClick, onItemDoubleClick, onItemDelete}: TodoItemProps) => (
    <li
        onDoubleClick={onItemDoubleClick}
        className={isCompleted
            ? 'list-group-item list-group-item-danger animated fadeIn'
            : 'list-group-item list-group-item-success animated bounce'
        }
    >
        <input
            type="checkbox"
            defaultChecked={isCompleted}
            onClick={onItemClick}
        />
        {title}
        <button
            type="button"
            className="close"
            onClick={onItemDelete}
        >
            <span>&times;</span>
        </button>
    </li>
)

export default TodoItem