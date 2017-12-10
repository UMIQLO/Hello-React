//@flow
import React from 'react'
import type {TodoListProps} from "../definitions/TodoTypeDefinition"


const TodoList = ({children, onItemFilter, onSortingChange}: TodoListProps) => {

    let sortType: any = null

    return (
        <div>
            <label>
                <input
                    type="checkbox"
                    defaultChecked
                    onClick={onItemFilter}
                />
                包含已完成的項目
            </label>
            <select
                ref={el => {
                    sortType = el
                }}
                onChange={
                    () => {
                        onSortingChange(sortType.value)
                    }
                }
            >
                <option value="">===無排序===</option>
                <option value="asc">升序</option>
                <option value="desc">降序</option>
            </select>
            <ul className="list-group">
                {children}
            </ul>
        </div>
    )
}

export default TodoList