import { createSelector } from 'reselect'
import { RootState } from "../state";

const order = (state: RootState ) => state.cells.order;
const data = (state: RootState ) => state.cells.data;

export const selectedCellsMemoized = createSelector(
  [order, data],
  (order, data) => order.map((id: string) => data[id])
)