//@flow
import React from 'react'
import type {TodoSearchFormProps} from "../definitions/TodoTypeDefinition"

const TodoSearchForm = ({placeholderText, onItemSearch}: TodoSearchFormProps) => {

    let titleField: any = null

    //一個用於記錄composition狀態用的
    let isOnComposition: boolean = false

    const handleComposition = (e: KeyboardEvent) => {
        (e.type === 'compositionend')
            //composition結束，代表中文輸入完成
            ? isOnComposition = false
            //composition進行中，代表正在輸入中文
            : isOnComposition = true
    }

    return (
        <div>
            <input
                className="form-control"
                type="text"
                ref={el => {
                    titleField = el
                }}
                placeholder={placeholderText}
                onCompositionStart={handleComposition}
                onCompositionUpdate={handleComposition}
                onCompositionEnd={handleComposition}
                onChange={(e: KeyboardEvent) => {
                    if (e.target instanceof HTMLInputElement
                        && !isOnComposition) {
                        onItemSearch(titleField.value)
                    }
                }}
            />
        </div>
    )
}

export default TodoSearchForm