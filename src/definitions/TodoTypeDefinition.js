//@flow
export type Item = {
    id: number,
    title: string,
    isCompleted: boolean,
    isEditing: boolean,
}

export type TodoListProps = {
    children?: React.Element<*>,
    onItemFilter: Function,
    onSortingChange: Function,
}

export type TodoItemProps = {
    title: string,
    isCompleted: boolean,
    onItemClick: Function,
    onItemDoubleClick: Function,
    onItemDelete: Function,
}

export type TodoAddFormProps = {
    placeholderText: string,
    onItemAdd: (x: Item) => void,
}

export type TodoEditFormProps = {
    title: string,
    onItemUpdate: (x: string) => void,
}
export type TodoSearchFormProps = {
    placeholderText: string,
    onItemSearch: (x: string) => void,
}