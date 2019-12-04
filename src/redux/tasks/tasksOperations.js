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
      dispatch(AC.getTasksSeccassAC(res.message.tasks));
      dispatch(AC.getCountTasksSeccassAC(res.message.total_task_count));
    })
    .catch(err => {
      AC.getTasksFailureAC(err);
      AC.getCountTasksFailureAC(err);
    });
};

/* CHANGE */
/* token раньше прокидывал */
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
      console.log(res);
      if (res.status === 'ok') {
        dispatch(AC.changeTaskSeccassAC(id, text, status));

        /* если текст разный что бы потом отобразиь что он редактировался */
        if (textItemChange !== text) {
          dispatch(AC.idItemChangeTextAC(id));
        }
        return;
      }

      /* Если срок токена закончен */
      if (res.status === 'error') {
        // dispatch(AC.makedMistakeAC(res.message.token));
        // dispatch(AC.changeTaskFailureAC(res.message.token)); // ?
        dispatch(ACLogin.tokenIsEndAC(res.message.token)); // ?
      }
    })
    .catch(err => dispatch(AC.changeTaskFailureAC(err)));
};

/* ADD */
const addTaskThunk = (username, email, text) => dispatch => {
  dispatch(AC.addTaskStartAC());

  tasksAPI
    .addTask(username, email, text)
    .then(res => {
      // console.log(res);
      /* Если все поля указаны и они волидные */
      if (res.status === 'ok') {
        // console.log('ok');
        // console.log(res.message);
        dispatch(AC.addTaskSeccassAC(res.message));
      }
      /* Если какое то или какие то поля не заполнены или не валидны. Хотя и так проверка на клиенте происходин=) */
      if (res.status === 'error') {
        // НАПИСАТЬ ТУТ КОД
        dispatch(AC.addTaskFailureAC(res.message)); // ?
      }
    })
    .catch(err => dispatch(AC.addTaskFailureAC(err)));
};

export default { getTasksThunk, changeTaskThunk, addTaskThunk };
