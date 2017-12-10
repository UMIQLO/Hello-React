//@flow
import React from 'react'

import type {TodoAddFormProps} from "../definitions/TodoTypeDefinition"

const TodoAddForm = ({placeholderText, onItemAdd}: TodoAddFormProps) => {

    let titleField: any = null

    return (
        <div>
            <input
                type="text"
                className="form-control"
                ref={el => {
                    titleField = el
                }}
                placeholder={placeholderText}
                onKeyPress={(e) => {
                    if (titleField.value.trim()
                        && e.target instanceof HTMLInputElement
                        && e.key === 'Enter') {
                        onItemAdd({
                            id: +new Date(),
                            title: titleField.value,
                            isCompleted: false,
                        })
                        titleField.value = ''
                    }
                }}
            />
        </div>
    )
}

export default TodoAddForm