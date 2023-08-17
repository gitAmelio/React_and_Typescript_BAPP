import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../state";

const selectBundleItem = (state: RootState, bundleId: string) => state.bundles[bundleId];
const selectOrder = (state: RootState ) => state.cells.order;
const selectData = (state: RootState ) => state.cells.data;
const selectCellId = (state: RootState, cellId: string) => cellId;
const selectOrderedCells = createSelector(
  [selectOrder, selectData],
  (order, data) => order.map(id => data[id])
);



const selectCumulativeCode = createSelector(
  [selectOrderedCells, selectCellId],
  (orderedCells, cellId): string[] => {
    const cumulativeCode = [

    ];
    const showFunc =`
      import _React from 'react';
      import _ReactDOM from 'react-dom';

      var show = (value) => {
        const root = document.querySelector('#root')
        if (typeof value === 'object'){
          // check for JSX
          if (value.$$typeof && value.props){
            _ReactDOM.render(value, root);
          } else {
            root.innerHTML = JSON.stringify(value);
          }
        } else {
          root.innerHTML = value;
        }
      }
    `;

    const showFuncNoop = 'var show = ()=>{}';

    for (let c of orderedCells) {
      if (c.type === 'code') {
        if (c.id === cellId) {
          cumulativeCode.push(showFunc);
        } else {
          cumulativeCode.push(showFuncNoop);
        }
        cumulativeCode.push(c.content);
      }
      if (c.id === cellId) {
        break;
      }
    }
    return cumulativeCode;
  }
)

export { 
  selectCumulativeCode, 
  selectBundleItem, 
  selectOrderedCells
};