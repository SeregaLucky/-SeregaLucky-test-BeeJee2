import { combineReducers } from 'redux';
import * as types from './tasksTypes';

/*
 * GET_TASKS   &&   CHANGE_TASK
 */
const itemsReducer = (state = [], { type, payload }) => {
  switch (type) {
    case types.GET_TASKS_SECCASS:
      return payload.tasks;

    case types.CHANGE_TASK_SUCCESS:
      return state.map(task =>
        task.id === payload.id
          ? { ...task, text: payload.text, status: payload.status }
          : task,
      );

    default:
      return state;
  }
};

/*
 * ADD_TASK
 */
const addNewItemReducer = (state = null, { type, payload }) => {
  switch (type) {
    case types.ADD_TASK_SECCASS:
      return payload.newTask;

    default:
      return state;
  }
};

/*
 * LOADING
 */
const loadingReducer = (state = false, { type }) => {
  switch (type) {
    case types.GET_TASKS_START:
    case types.CHANGE_TASK_START:
    case types.ADD_TASK_START:
      return true;

    case types.GET_TASKS_SECCASS:
    case types.GET_TASKS_FAILURE:
    case types.CHANGE_TASK_SUCCESS:
    case types.CHANGE_TASK_FAILURE:
    case types.ADD_TASK_SECCASS:
    case types.ADD_TASK_FAILURE:
      return false;

    default:
      return state;
  }
};

/*
 * ERROR
 */
const errorReducer = (state = null, { type, payload }) => {
  switch (type) {
    case types.GET_TASKS_START:
    case types.CHANGE_TASK_START:
    case types.ADD_TASK_START:
      return null;

    case types.GET_TASKS_FAILURE:
    case types.CHANGE_TASK_FAILURE:
    case types.ADD_TASK_FAILURE:
      return payload.error;

    default:
      return state;
  }
};

/*
 * GET_COUNT_TASKS
 */
const itemsCountReducer = (state = null, { type, payload }) => {
  switch (type) {
    case types.GET_COUNT_TASKS_SECCASS:
      return payload.count;

    default:
      return state;
  }
};

const idsItemsChangeTextThunk = (state = [], { type, payload }) => {
  switch (type) {
    case types.ID_ITEM_CHANGE_TEXT:
      return [payload.id, ...state];

    default:
      return state;
  }
};

export default combineReducers({
  items: itemsReducer,
  itemsCount: itemsCountReducer,
  newItem: addNewItemReducer,

  loading: loadingReducer,
  error: errorReducer,

  idsItemsChangeText: idsItemsChangeTextThunk,
});
