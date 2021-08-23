// Project store
import { store } from '../../store/'

const reducerKey = 'todos'
const initialState = [
    { id: 1, title: 'Learn something' },
    { id: 2, title: 'Learn something new' },
]
const reducers = {
    CREATE_TODO: (todos, item) => [
        ...todos,
        { ...item, id: getUniqueId(todos) },
    ],
    DELETE_TODO: (todos, item) => {
        return todos.filter((todo) => todo.id !== item.id)
    },
}

export const createTodo = (todo) =>
    store.dispatch({ type: 'CREATE_TODO', payload: todo })
export const deleteTodo = (todo) =>
    store.dispatch({ type: 'DELETE_TODO', payload: todo })

export const getState = () => store.getState()[reducerKey]
export const subscribe = (f) => {
    let lastState = getState()
    return store.subscribe(
        () => lastState !== getState() && f((lastState = getState()))
    )
}

const getUniqueId = (todos) =>
    todos.length > 0 ? Math.max(...todos.map((t) => t.id)) + 1 : 1

store.injectReducer(reducerKey, (state = initialState, { type, payload }) => {
    return reducers[type] ? reducers[type](state, payload) : state
})
