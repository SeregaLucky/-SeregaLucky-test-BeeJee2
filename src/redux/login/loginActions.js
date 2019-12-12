import { createAction } from '@reduxjs/toolkit';
import * as types from './loginTypes';

export const loginingStartAC = createAction(types.LOGINING_START);

export const loginingSeccassAC = createAction(types.LOGINING_SECCASS);

export const loginingFailureAC = createAction(types.LOGINING_FAILURE);

export const loginingMistakeInInputAC = createAction(
  types.LOGINING_MISTAKE_IN_INPUT,
);

export const deleteTokenAC = createAction(types.DELETE_TOKEN);

export const tokenIsEndAC = createAction(types.TOKEN_IS_END);

//
//
//
//

/*
 * When a do not use '@reduxjs/toolkit'
 */
// import * as types from './loginTypes';

// export const loginingStartAC = () => ({
//   type: types.LOGINING_START,
// });

// export const loginingSeccassAC = token => ({
//   type: types.LOGINING_SECCASS,

//   payload: {
//     token,
//   },
// });

// export const loginingMistakeInInputAC = message => ({
//   type: types.LOGINING_MISTAKE_IN_INPUT,

//   payload: {
//     message: { message },
//   },
// });

// export const loginingFailureAC = error => ({
//   type: types.LOGINING_FAILURE,

//   payload: {
//     error,
//   },
// });

// export const deleteTokenAC = () => ({
//   type: types.DELETE_TOKEN,
// });

// export const tokenIsEndAC = messsage => ({
//   type: types.TOKEN_IS_END,

//   payload: {
//     messsage,
//   },
// });
