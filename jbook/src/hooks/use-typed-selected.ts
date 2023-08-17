import { useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from "../state";
import { 
  selectBundleItem, 
  selectCumulativeCode, 
  selectOrderedCells 
} from "../selectors";

// help react-redux understand the type of data in the store
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useSelectCumulativeCode = (cellId: string) => {
  return useSelector((state: RootState) => {
    return selectCumulativeCode(state, cellId).join('\n');
  })
}

export const useSelectBundleItem = (cellId: string) => {
  return useSelector((state: RootState) => {
    return selectBundleItem(state, cellId)
  })
} 

export const useSelectOrderedCells = () => {
  return useSelector((state: RootState) => {
    return selectOrderedCells(state);
  })
}
