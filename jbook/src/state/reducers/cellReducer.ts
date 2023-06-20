import { produce } from 'immer'
import { ActionType } from '../action-types';
import { Action } from '../actions';
import { Cell } from '../cell';

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell
  }
}

const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data : {}
}

const reducer = produce((
  state: CellsState = initialState, 
  action: Action
  ) => {
    switch (action.type) {
      case ActionType.UPDATE_CELL: 
        const { id, content } = action.payload;
        // with immer u can replace the following:
        // const cellData = state.data[id]
        // return {
        //   ...state,
        //   [id]: {
        //     ...cellData,
        //     content
        //   }
        // }; 
        // with just
        state.data[id].content = content;
        return state;
      case ActionType.DELETE_CELL:
        const deleteId = action.payload;
        delete state.data[deleteId];
        state.order = state.order.filter(id => id !== deleteId)
        return state;
      case ActionType.MOVE_CELL:
        const { direction } = action.payload;
        const index = state.order.findIndex((id) => id === action.payload.id);
        const targetIndex = direction === 'up' ? index - 1 : index + 1;

        const beforeTheStartOfArray = targetIndex < 0;
        const beyondTheEndOfArray = targetIndex > state.order.length - 1;

        // gaurd against out of bounds
        if (beforeTheStartOfArray || beyondTheEndOfArray) {
          return state;
        }
        
        state.order[index] = state.order[targetIndex];
        state.order[targetIndex] = action.payload.id

        return state;
      case ActionType.INSERT_CELL_BEFORE:
        const cell: Cell = {
          content: '',
          type: action.payload.type,
          id:randomId()
        }

        state.data[cell.id] = cell;
        const beforeCellIndex = state.order.findIndex(id => id === action.payload.id);

        if (beforeCellIndex < 0) {
          state.order.push(cell.id);
        } else {
          state.order.splice(beforeCellIndex, 0, cell.id)
        }

        return state;
      default:
        return state; 

    }
});

const randomId = () => {
  // return Math.random().toString(36).substr(2,5)
  return Math.random().toString(36).substring(2, 2+5);
}

export default reducer;