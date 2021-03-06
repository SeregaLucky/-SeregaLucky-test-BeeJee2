import { tasksAPI } from '../../api/api';
import * as AC from './tasksActions';
import * as ACLogin from '../login/loginActions';

/* GET */
const getTasksThunk = (page, sortField, sortDirection) => dispatch => {
  dispatch(AC.getTasksStartAC());
  dispatch(AC.getCountTasksStartAC());

  tasksAPI
    .getTasks(page, sortField, sortDirection)
    .then(res => {
      const { tasks, total_task_count: count } = res.message;

      dispatch(AC.getTasksSeccassAC({ tasks }));
      dispatch(AC.getCountTasksSeccassAC({ count }));
    })
    .catch(error => {
      AC.getTasksFailureAC({ error });
      AC.getCountTasksFailureAC({ error });
    });
};

/* CHANGE */
const changeTaskThunk = (id, text, status) => (dispatch, getState) => {
  dispatch(AC.changeTaskStartAC());

  /* достаю токен со сториджа */
  let login = localStorage.getItem('persist:login');
  login = JSON.parse(login);
  const token = JSON.parse(login.token);

  /* Для будущей проверки поменялся ли текст */
  const state = getState();
  const allItem = state.tasks.items;
  const itemChange = allItem.find(item => item.id === id);
  const textItemChange = itemChange.text;

  const makeNumberStatus = status ? 10 : 0;

  tasksAPI
    .changeTask(id, text, makeNumberStatus, token)
    .then(res => {
      if (res.status === 'ok') {
        dispatch(
          AC.changeTaskSeccassAC({ id, text, status: makeNumberStatus }),
        );

        /* если текст разный что бы потом отобразиь что он редактировался */
        if (textItemChange !== text) {
          dispatch(AC.idItemChangeTextAC({ id }));
        }
        return;
      }

      /* Если срок токена закончен */
      if (res.status === 'error') {
        const { token: tokenEnd } = res.message;

        dispatch(ACLogin.tokenIsEndAC({ message: tokenEnd }));
      }
    })
    .catch(error => dispatch(AC.changeTaskFailureAC({ error })));
};

/* ADD */
const addTaskThunk = (username, email, text) => dispatch => {
  dispatch(AC.addTaskStartAC());

  tasksAPI
    .addTask(username, email, text)
    .then(res => {
      /* Если все поля указаны и они волидные */
      if (res.status === 'ok') {
        const { message: newTask } = res;
        dispatch(AC.addTaskSeccassAC({ newTask }));
      }

      if (res.status === 'error') {
        const { message: error } = res;
        dispatch(AC.addTaskFailureAC({ error }));
      }
    })
    .catch(error => dispatch(AC.addTaskFailureAC(error)));
};

export default { getTasksThunk, changeTaskThunk, addTaskThunk };

//
//
//
//

/*
 * When a do not use '@reduxjs/toolkit'
 */
// import { tasksAPI } from '../../api/api';
// import * as AC from './tasksActions';
// import * as ACLogin from '../login/loginActions';

// /* GET */
// const getTasksThunk = (page, sortField, sortDirection) => dispatch => {
//   dispatch(AC.getTasksStartAC());
//   dispatch(AC.getCountTasksStartAC());

//   tasksAPI
//     .getTasks(page, sortField, sortDirection)
//     .then(res => {
//       dispatch(AC.getTasksSeccassAC(res.message.tasks));
//       dispatch(AC.getCountTasksSeccassAC(res.message.total_task_count));
//     })
//     .catch(err => {
//       AC.getTasksFailureAC(err);
//       AC.getCountTasksFailureAC(err);
//     });
// };

// /* CHANGE */
// const changeTaskThunk = (id, text, status) => (dispatch, getState) => {
//   dispatch(AC.changeTaskStartAC());

//   /* достаю токен со сториджа */
//   let login = localStorage.getItem('persist:login');
//   login = JSON.parse(login);
//   const token = JSON.parse(login.token);

//   /* Для будущей проверки поменялся ли текст */
//   const state = getState();
//   const allItem = state.tasks.items;
//   const itemChange = allItem.find(item => item.id === id);
//   const textItemChange = itemChange.text;

//   const makeNumberStatus = status ? 10 : 0;

//   tasksAPI
//     .changeTask(id, text, makeNumberStatus, token)
//     .then(res => {
//       if (res.status === 'ok') {
//         dispatch(AC.changeTaskSeccassAC(id, text, status));

//         /* если текст разный что бы потом отобразиь что он редактировался */
//         if (textItemChange !== text) {
//           dispatch(AC.idItemChangeTextAC(id));
//         }
//         return;
//       }

//       /* Если срок токена закончен */
//       if (res.status === 'error') {
//         dispatch(ACLogin.tokenIsEndAC(res.message.token));
//       }
//     })
//     .catch(err => dispatch(AC.changeTaskFailureAC(err)));
// };

// /* ADD */
// const addTaskThunk = (username, email, text) => dispatch => {
//   dispatch(AC.addTaskStartAC());

//   tasksAPI
//     .addTask(username, email, text)
//     .then(res => {
//       /* Если все поля указаны и они волидные */
//       if (res.status === 'ok') {
//         dispatch(AC.addTaskSeccassAC(res.message));
//       }

//       if (res.status === 'error') {
//         dispatch(AC.addTaskFailureAC(res.message));
//       }
//     })
//     .catch(err => dispatch(AC.addTaskFailureAC(err)));
// };

// export default { getTasksThunk, changeTaskThunk, addTaskThunk };
