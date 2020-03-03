import {createAction, handleActions} from "redux-actions";
import {createSelector} from "reselect";
import {SET_DATA, SET_MUSIC, SET_VIDEO, SWITCH_THEME} from "./actions";

// ==================================
// Selectors
// ==================================
export const appDataSelector = createSelector(
  state => state.app,
  app => app.appData
);

export const themeModeSelector = createSelector(
  state => state.app,
  app => app.darkMode
);

export const isSubscriptionActiveSelector = createSelector(
  state => state.app,
  app => (app.appData || {}).subscriptionActive
);

// ==================================
// Actions
// ==================================
export const setAppData = createAction(SET_DATA);

export const setMusic = createAction(SET_MUSIC);

export const setVideo = createAction(SET_VIDEO);

export const switchTheme = createAction(SWITCH_THEME);

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
  [switchTheme]: state => ({
    ...state,
    darkMode: !state.darkMode,
  }),
};

// ==================================
// Reducer
// ==================================

const initialState = {
  appData: {},
  darkMode: true,
};

export default handleActions(ACTION_HANDLERS, initialState);
