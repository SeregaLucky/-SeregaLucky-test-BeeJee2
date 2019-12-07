import * as types from './tasksTypes';

/*
 * GET_TASKS
 */
export const getTasksStartAC = () => ({
  type: types.GET_TASKS_START,
});

export const getTasksSeccassAC = tasks => ({
  type: types.GET_TASKS_SECCASS,

  payload: {
    tasks,
  },
});

export const getTasksFailureAC = error => ({
  type: types.GET_TASKS_FAILURE,

  payload: {
    error,
  },
});

/*
 * GET_COUNT_TASKS
 */
export const getCountTasksStartAC = () => ({
  type: types.GET_COUNT_TASKS_START,
});

export const getCountTasksSeccassAC = count => ({
  type: types.GET_COUNT_TASKS_SECCASS,

  payload: {
    count,
  },
});

export const getCountTasksFailureAC = error => ({
  type: types.GET_COUNT_TASKS_FAILURE,

  payload: {
    error,
  },
});

/*
 * CHANGE_TASK
 */
export const changeTaskStartAC = () => ({
  type: types.CHANGE_TASK_START,
});

export const changeTaskSeccassAC = (id, text, status) => ({
  type: types.CHANGE_TASK_SUCCESS,

  payload: {
    id,
    text,
    status: status ? 10 : 0,
  },
});

export const changeTaskFailureAC = error => ({
  type: types.CHANGE_TASK_FAILURE,

  payload: {
    error,
  },
});

/*
 * ADD_TASK
 */
export const addTaskStartAC = () => ({
  type: types.ADD_TASK_START,
});
export const addTaskSeccassAC = newTask => ({
  type: types.ADD_TASK_SECCASS,

  payload: {
    newTask,
  },
});

export const addTaskFailureAC = error => ({
  type: types.ADD_TASK_FAILURE,

  payload: {
    error,
  },
});

export const idItemChangeTextAC = id => ({
  type: types.ID_ITEM_CHANGE_TEXT,

  payload: {
    id,
  },
});
