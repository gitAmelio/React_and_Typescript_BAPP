import { useMemo } from 'react';
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from '../state';

export const useActions = () => {
  const dispatch = useDispatch();

  // like useState and useEffect combined
  // return useMemo(() => {
    // this function gets called only when dispatch changed
    // so only once
    return bindActionCreators(actionCreators, dispatch);
  // }, [dispatch])
}


