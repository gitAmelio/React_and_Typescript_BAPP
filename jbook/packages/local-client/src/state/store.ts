import { configureStore } from '@reduxjs/toolkit';
import reducers from './reducers';
import { ActionType } from './action-types';

export const store = configureStore({
    reducer: reducers
})

// manually dispatching Cells to the store
store.dispatch({
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
        id: null,
        type: 'code'
    }
})

store.dispatch({
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
        id: null,
        type: 'text'
    }
})

store.dispatch({
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
        id: null,
        type: 'code'
    }
})

store.dispatch({
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
        id: null,
        type: 'text'
    }
})

store.dispatch({
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
        id: null,
        type: 'code'
    }
})

export type AppDispatch = typeof store.dispatch

// console.log(store.getState())
