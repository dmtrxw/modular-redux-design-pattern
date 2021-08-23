import React from 'react'

// TodoList's store
import { getState, subscribe, createTodo, deleteTodo } from './store'

class TodoList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            todos: getState(),
        }

        this.setTodos = this.setTodos.bind(this)
        this.handleTitleChange = this.handleTitleChange.bind(this)
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.handleDeleteTodo = this.handleDeleteTodo.bind(this)
    }

    setTodos(todos) {
        this.setState({ todos })
    }

    handleTitleChange(event) {
        this.setState({ title: event.target.value })
    }

    handleFormSubmit(event) {
        event.preventDefault()

        createTodo({ title: this.state.title })
        this.setState({ title: '' })
    }

    handleDeleteTodo(todo) {
        deleteTodo(todo)
    }

    componentDidMount() {
        subscribe(this.setTodos)
    }

    render() {
        const { title, todos } = this.state
        return (
            <>
                <form onSubmit={this.handleFormSubmit}>
                    <input
                        type="text"
                        autoComplete="off"
                        onChange={this.handleTitleChange}
                        value={title}
                    />
                    <input type="submit" />
                </form>
                <ul>
                    {todos.map((todo) => (
                        <li key={todo.id}>
                            {todo.title}{' '}
                            <button onClick={() => this.handleDeleteTodo(todo)}>
                                -
                            </button>
                        </li>
                    ))}
                </ul>
            </>
        )
    }
}

export default TodoList
