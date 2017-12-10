//@flow
import React from 'react'
import type {TodoEditFormProps} from "../definitions/TodoTypeDefinition"

const TodoEditForm = ({title, onItemUpdate}: TodoEditFormProps) => {
    let titleField: any = null
    return (
        <li className="list-group-item">
            <input
                type="text"
                defaultValue={title}
                ref={el => {
                    titleField = el
                }}
                autoFocus
                onBlur={(e) => {
                    if (titleField.value.trim()
                        && e.target instanceof HTMLInputElement) {
                        onItemUpdate(titleField.value)
                    }
                }}
                onKeyPress={(e) => {
                    if (titleField.value.trim()
                        && e.target instanceof HTMLInputElement
                        && e.key === 'Enter') {
                        onItemUpdate(titleField.value)
                    }
                }}
            />
        </li>
    )
}
export default TodoEditForm