import { useSelector, TypedUseSelectorHook } from "react-redux";
// import { useSelector, createSelectorHook } from "react-redux";
import { RootState } from "../state";

// help react-redux understand the type of data in the store
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
// export const useTypedSelector = createSelectorHook<RootState>();
