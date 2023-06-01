  import { useAppDispatch } from "../state/hooks";
  import { bindActionCreators } from "redux";
  import { actionCreators } from "../state";

  export const useActions = () => {
    // get reference to compoment's dispatch function
    const dispatch = useAppDispatch();

    return bindActionCreators(actionCreators, dispatch);
  }