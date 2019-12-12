import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import * as types from './tasksTypes';
import * as loginTypes from '../login/loginTypes';

/*
 * GET_TASKS   &&   CHANGE_TASK
 */
const itemsReducer = createReducer([], {
  [types.GET_TASKS_SECCASS]: (state, { payload }) => payload.tasks,

  [types.CHANGE_TASK_SUCCESS]: (state, { payload }) =>
    state.map(task =>
      task.id === payload.id
        ? { ...task, text: payload.text, status: payload.status }
        : task,
    ),
});

/*
 * ADD_TASK
 */
const addNewItemReducer = createReducer(null, {
  [types.ADD_TASK_SECCASS]: (state, { payload }) => payload.newTask,
});

/*
 * LOADING
 */
const loadingReducer = createReducer(false, {
  [types.GET_TASKS_START]: () => true,
  [types.CHANGE_TASK_START]: () => true,
  [types.ADD_TASK_START]: () => true,

  [types.GET_TASKS_SECCASS]: () => false,
  [types.GET_TASKS_FAILURE]: () => false,
  [types.CHANGE_TASK_SUCCESS]: () => false,
  [types.CHANGE_TASK_FAILURE]: () => false,
  [types.ADD_TASK_SECCASS]: () => false,
  [types.ADD_TASK_FAILURE]: () => false,
  [loginTypes.TOKEN_IS_END]: () => false,
});

/*
 * ERROR
 */
const errorReducer = createReducer(null, {
  [types.GET_TASKS_START]: () => null,
  [types.CHANGE_TASK_START]: () => null,
  [types.ADD_TASK_START]: () => null,

  [types.GET_TASKS_FAILURE]: (state, { payload }) => payload.error,
  [types.CHANGE_TASK_FAILURE]: (state, { payload }) => payload.error,
  [types.ADD_TASK_FAILURE]: (state, { payload }) => payload.error,
});

/*
 * GET_COUNT_TASKS
 */
const itemsCountReducer = createReducer(null, {
  [types.GET_COUNT_TASKS_SECCASS]: (state, { payload }) => payload.count,
});

const idsItemsChangeTextReducer = createReducer([], {
  [types.ID_ITEM_CHANGE_TEXT]: (state, { payload }) => [payload.id, ...state],
});

export default combineReducers({
  items: itemsReducer,
  itemsCount: itemsCountReducer,
  newItem: addNewItemReducer,

  loading: loadingReducer,
  error: errorReducer,

  idsItemsChangeText: idsItemsChangeTextReducer,
});

//
//
//
//

/*
 * When a do not use '@reduxjs/toolkit'
 */
// import { combineReducers } from 'redux';
// import * as types from './tasksTypes';
// import * as loginTypes from '../login/loginTypes';

// /*
//  * GET_TASKS   &&   CHANGE_TASK
//  */
// const itemsReducer = (state = [], { type, payload }) => {
//   switch (type) {
//     case types.GET_TASKS_SECCASS:
//       return payload.tasks;

//     case types.CHANGE_TASK_SUCCESS:
//       return state.map(task =>
//         task.id === payload.id
//           ? { ...task, text: payload.text, status: payload.status }
//           : task,
//       );

//     default:
//       return state;
//   }
// };

// /*
//  * ADD_TASK
//  */
// const addNewItemReducer = (state = null, { type, payload }) => {
//   switch (type) {
//     case types.ADD_TASK_SECCASS:
//       return payload.newTask;

//     default:
//       return state;
//   }
// };

// /*
//  * LOADING
//  */
// const loadingReducer = (state = false, { type }) => {
//   switch (type) {
//     case types.GET_TASKS_START:
//     case types.CHANGE_TASK_START:
//     case types.ADD_TASK_START:
//       return true;

//     case types.GET_TASKS_SECCASS:
//     case types.GET_TASKS_FAILURE:
//     case types.CHANGE_TASK_SUCCESS:
//     case types.CHANGE_TASK_FAILURE:
//     case types.ADD_TASK_SECCASS:
//     case types.ADD_TASK_FAILURE:
//     case loginTypes.TOKEN_IS_END:
//       return false;

//     default:
//       return state;
//   }
// };

// /*
//  * ERROR
//  */
// const errorReducer = (state = null, { type, payload }) => {
//   switch (type) {
//     case types.GET_TASKS_START:
//     case types.CHANGE_TASK_START:
//     case types.ADD_TASK_START:
//       return null;

//     case types.GET_TASKS_FAILURE:
//     case types.CHANGE_TASK_FAILURE:
//     case types.ADD_TASK_FAILURE:
//       return payload.error;

//     default:
//       return state;
//   }
// };

// /*
//  * GET_COUNT_TASKS
//  */
// const itemsCountReducer = (state = null, { type, payload }) => {
//   switch (type) {
//     case types.GET_COUNT_TASKS_SECCASS:
//       return payload.count;

//     default:
//       return state;
//   }
// };

// const idsItemsChangeTextReducer = (state = [], { type, payload }) => {
//   switch (type) {
//     case types.ID_ITEM_CHANGE_TEXT:
//       return [payload.id, ...state];

//     default:
//       return state;
//   }
// };

// export default combineReducers({
//   items: itemsReducer,
//   itemsCount: itemsCountReducer,
//   newItem: addNewItemReducer,

//   loading: loadingReducer,
//   error: errorReducer,

//   idsItemsChangeText: idsItemsChangeTextReducer,
// });
