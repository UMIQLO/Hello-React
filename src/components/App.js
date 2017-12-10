//@flow
import React from 'react'
import TodoList from './TodoList'
import TodoItem from './TodoItem'
import TodoAddForm from './TodoAddForm'
import TodoEditForm from './TodoEditForm'
import TodoSearchForm from './TodoSearchForm'

import type {Item} from "../definitions/TodoTypeDefinition";

import 'bootstrap/dist/css/bootstrap.css'
import 'animate.css'

let isFilteringOut: boolean = false
let isSearching: boolean = false
let keepSearchedItems: Array = null
const serverApi: String = 'http://localhost:21314'

class App extends React.Component {

    state: {
        items: Array<Item>,
        sortType: '' | 'asc' | 'desc'
    }

    constructor() {
        super()
        this.state = {
            items: [],
            sortType: '',
        }
    }

    handleItemAdd = (aItem: Item) => {
        const newItems = [aItem, ...this.state.items]

        this.setState({
            items: newItems,
        })
        // PUT Request to Server
        this.handleServerItemAdd(aItem)
    }

    handleStylingItem = (index: number) => {
        const newItems = [...this.state.items]
        newItems[index].isCompleted = !newItems[index].isCompleted
        this.setState({
            items: newItems,
        })
        this.handleServerItemUpdate(newItems[index])
    }

    handleEditItem = (index: number) => {
        const newItems = [...this.state.items]
        newItems[index].isEditing = !newItems[index].isEditing
        this.setState({
            items: newItems,
        })
    }

    handleEditItemUpdate = (index: number, title: string) => {
        const newItems = [...this.state.items]
        newItems[index].title = title
        newItems[index].isEditing = !newItems[index].isEditing
        this.setState({
            items: newItems,
        })
        this.handleServerItemUpdate(newItems[index])
    }

    handleItemFilter = () => {
        isFilteringOut = !isFilteringOut
        const newItems = [...this.state.items]
        this.setState({
            items: newItems
        })
    }

    handleItemSearch = (searchWord: string) => {
        // 一開始先拷貝目前在state中的items到陣列中，保存所有的items
        // 並設定isSearching為true，表示正準備搜尋
        if (!isSearching) {
            isSearching = true
            keepSearchedItems = [...this.state.items]
        }
        // 當還在搜尋(isSearching為true)時，如果searchword是空字串，代表使用者已經把文字框清空了
        // 準備回復原先的列表資料情況，並設定(isSearching為false)
        if (isSearching && searchWord === '') {
            isSearching = false
            this.setState({
                items: keepSearchedItems
            })
        } else {
            const newItems = keepSearchedItems.filter((item) => (
                item.title.includes(searchWord)
            ))
            this.setState({
                items: newItems
            })
        }
    }

    handleItemSorting = (sortType: String) => {

        let newItems = [...this.state.items]

        if (sortType === 'asc') {
            newItems = newItems.sort((a, b) => (
                a.title.localeCompare(b.title, 'zh-Hans-TW-u-co-stroke')
            ))
        }

        if (sortType === 'desc') {
            newItems = newItems.sort((a, b) => (
                b.title.localeCompare(a.title, 'zh-Hans-TW-u-co-stroke')
            ))
        }

        this.setState({
            items: newItems,
            sortType
        })
    }

    handleServerItemsLoad = () => {
        fetch(`${serverApi}/items?_sort=id&_order=DESC`, {
            method: 'GET'
        })
            .then((response) => {
                if (!response.ok) throw new Error(response.statusText)
                return response.json()
            })
            .then((itemList) => {
                const items = itemList.map((item) => {
                    return Object.assign({}, item, {isEditing: false})
                })
                this.setState({
                    items,
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    handleServerItemAdd = (aItem: Item) => {
        const {id, title, isCompleted} = aItem
        const payload = {id, title, isCompleted}

        fetch(`${serverApi}/items`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then((response) => {
            if (!response.ok) throw new Error(response.statusText)
            return response.json()
        }).then((item) => {
            //這裡可以顯示一些訊息，或是結束指示動畫…
        }).catch((error) => {
            //這裡可以顯示一些錯誤訊息
            console.log(error)
        })
    }

    handleServerItemUpdate = (aItem: Item) => {
        const {id, title, isCompleted} = aItem
        const payload = {id, title, isCompleted}

        fetch(`${serverApi}/items/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then((response) => {
            if (!response.ok) throw new Error(response.statusText)
            return response.json()
        }).then((item) => {
            // Display Finish Animation ...
        }).catch((error) => {
            console.log(error)
        })
    }

    handleItemDelete = (index: string) => {
        const newItems = [...this.state.items]
        const itemId = newItems[index].id
        newItems.splice(index, 1)
        this.handleServerItemDelete(itemId)
        this.setState({
            items: newItems
        })
    }

    handleServerItemDelete = (id: string) => {
        fetch(`${serverApi}/items/${id}`, {
            method: 'DELETE'
        }).then((response) => {
            if (!response.ok) throw new Error(response.statusText)
            return response.json()
        }).then((item) => {
            // Display Finish Animate
        }).catch((error) => {
            console.log(error)
        })
    }

    componentDidMount() {
        // Load Data From Json Server
        this.handleServerItemsLoad()
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-light bg-dark">
                    <span className="navbar-brand mb-0 h1 text-white">TodoApp</span>
                </nav>
                <TodoAddForm placeholderText="開始輸入文字" onItemAdd={this.handleItemAdd}/>
                <TodoSearchForm placeholderText="開始搜尋" onItemSearch={this.handleItemSearch}/>
                <TodoList
                    onItemFilter={this.handleItemFilter}
                    onSortingChange={this.handleItemSorting}
                >
                    {
                        this.state.items.map((item, index) => {
                            if (isFilteringOut && item.isCompleted) {
                                return null
                            }
                            return (
                                (item.isEditing)
                                    ?
                                    <TodoEditForm
                                        key={item.id}
                                        title={item.title}
                                        onItemUpdate={(title) => {
                                            this.handleEditItemUpdate(index, title)
                                        }}
                                    />
                                    :
                                    <TodoItem
                                        key={item.id}
                                        title={item.title}
                                        isCompleted={item.isCompleted}
                                        onItemDoubleClick={() => {
                                            this.handleEditItem(index)
                                        }}
                                        onItemClick={() => {
                                            this.handleStylingItem(index)
                                        }}
                                        onItemDelete={() => {
                                            this.handleItemDelete(index)
                                        }}
                                    />
                            )
                        })
                    }
                </TodoList>
            </div>
        )
    }
}

export default App