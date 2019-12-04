import { authAPI } from '../../api/api';
import * as AC from './loginActions';

const loginingThunk = (username, password) => dispatch => {
  dispatch(AC.loginingStartAC());

  authAPI
    .postLigin(username, password)
    .then(res => {
      console.log(res);

      if (res.status !== 'ok') {
        dispatch(AC.loginingMistakeInInputAC(res.message.password));
        return;
      }

      dispatch(AC.loginingSeccassAC(res.message.token));
    })
    .catch(err => dispatch(AC.loginingFailureAC(err)));
};

export default { loginingThunk };
