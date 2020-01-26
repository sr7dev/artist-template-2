import {createAction, handleActions} from "redux-actions";
import {createSelector} from "reselect";
import * as mock from "../constants/mock";
import {SET_DATA, SET_MUSIC, SET_VIDEO} from "./actions";

// ==================================
// Selectors
// ==================================
export const dataSelector = createSelector(
  state => state.app,
  app => app.data
);

export const appDataSelector = createSelector(
  state => state.app,
  app => app.appData
);

// ==================================
// Actions
// ==================================
export const setAppData = createAction(SET_DATA);

export const setMusic = createAction(SET_MUSIC);

export const setVideo = createAction(SET_VIDEO);

// ==================================
// Action Handlers
// ==================================
const ACTION_HANDLERS = {
  [setAppData]: (state, action) => ({
    ...state,
    appData: {
      musicItems: [],
      videoItems: [],
      ...action.payload,
    },
  }),
  [setMusic]: (state, action) => ({
    ...state,
    appData: {
      ...state.appData,
      musicItems: action.payload,
    },
  }),
  [setVideo]: (state, action) => ({
    ...state,
    appData: {
      ...state.appData,
      videoItems: action.payload,
    },
  }),
};

// ==================================
// Reducer
// ==================================

const initialState = {
  data: mock,
};

export default handleActions(ACTION_HANDLERS, initialState);
