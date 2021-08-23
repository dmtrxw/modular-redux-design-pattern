import { createStore, combineReducers } from 'redux'

const initialState = { message: 'Hello world' }
const reducers = {
    root: (state = initialState) => state,
}

export const store = createStore(
    (s) => s,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

store.injectReducer = (key, reducer) => {
    reducers[key] = reducer
    store.replaceReducer(combineReducers(reducers))
}
