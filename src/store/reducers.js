import {combineReducers} from "redux";
import appReducer from "../modules/app";
import loadingReducer from "../modules/loading";

export const makeRootReducer = asyncReducers => {
  const reducers = {
    app: appReducer,
    loading: loadingReducer,
    ...asyncReducers,
  };
  return combineReducers(reducers);
};

export default makeRootReducer;
