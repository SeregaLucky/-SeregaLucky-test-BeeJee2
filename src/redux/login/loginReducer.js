import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import * as types from './loginTypes';

const tokenReducer = createReducer(null, {
  [types.LOGINING_SECCASS]: (state, { payload }) => payload.token,
  [types.DELETE_TOKEN]: () => null,
  [types.TOKEN_IS_END]: () => null,
});

const loginingMistakeInInputReducer = createReducer(null, {
  [types.LOGINING_MISTAKE_IN_INPUT]: (state, { payload }) => payload.message,
});

const loadingReducer = createReducer(false, {
  [types.LOGINING_START]: () => true,
  [types.LOGINING_SECCASS]: () => false,
  [types.LOGINING_FAILURE]: () => false,
  [types.LOGINING_MISTAKE_IN_INPUT]: () => false,
});

const tokenIsEndReducer = createReducer(null, {
  [types.TOKEN_IS_END]: (state, { payload }) => payload.message,
});

const errorReducer = createReducer(null, {
  [types.LOGINING_START]: () => null,
  [types.LOGINING_FAILURE]: (state, { payload }) => payload.error,
});

export default combineReducers({
  token: tokenReducer,
  loginingMistakeInInput: loginingMistakeInInputReducer,
  loading: loadingReducer,
  tokenIsEnd: tokenIsEndReducer,
  error: errorReducer,
});

//
//
//
//

/*
 * When a do not use '@reduxjs/toolkit'
 */
// import { combineReducers } from 'redux';
// import * as types from './loginTypes';

// const tokenReducer = (state = null, { type, payload }) => {
//   switch (type) {
//     case types.LOGINING_SECCASS:
//       return payload.token;

//     case types.DELETE_TOKEN:
//     case types.TOKEN_IS_END:
//       return null;

//     default:
//       return state;
//   }
// };

// const loginingMistakeInInputReducer = (state = null, { type, payload }) => {
//   switch (type) {
//     case types.LOGINING_MISTAKE_IN_INPUT:
//       return payload.message;

//     default:
//       return state;
//   }
// };

// const loadingReducer = (state = false, { type }) => {
//   switch (type) {
//     case types.LOGINING_START:
//       return true;

//     case types.LOGINING_SECCASS:
//     case types.LOGINING_FAILURE:
//     case types.LOGINING_MISTAKE_IN_INPUT:
//       return false;

//     default:
//       return state;
//   }
// };

// const tokenIsEndReducer = (state = null, { type, payload }) => {
//   switch (type) {
//     case types.TOKEN_IS_END:
//       return payload.messsage;

//     default:
//       return state;
//   }
// };

// const errorReducer = (state = null, { type, payload }) => {
//   switch (type) {
//     case types.LOGINING_START:
//       return null;

//     case types.LOGINING_FAILURE:
//       return payload.error;

//     default:
//       return state;
//   }
// };

// export default combineReducers({
//   token: tokenReducer,
//   loginingMistakeInInput: loginingMistakeInInputReducer,
//   loading: loadingReducer,
//   tokenIsEnd: tokenIsEndReducer,
//   error: errorReducer,
// });
