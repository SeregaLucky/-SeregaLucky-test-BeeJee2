import { authAPI } from '../../api/api';
import * as AC from './loginActions';

const loginingThunk = (username, password) => dispatch => {
  dispatch(AC.loginingStartAC());

  authAPI
    .postLigin(username, password)
    .then(res => {
      if (res.status !== 'ok') {
        const { password: passwordText } = res.message;
        dispatch(
          AC.loginingMistakeInInputAC({ message: { message: passwordText } }),
        );

        return;
      }

      const { token } = res.message;
      dispatch(AC.loginingSeccassAC({ token }));
    })
    .catch(err => dispatch(AC.loginingFailureAC({ err })));
};

export default { loginingThunk };

//
//
//
//

/*
 * When a do not use '@reduxjs/toolkit'
 */
// import { authAPI } from '../../api/api';
// import * as AC from './loginActions';

// const loginingThunk = (username, password) => dispatch => {
//   dispatch(AC.loginingStartAC());

//   authAPI
//     .postLigin(username, password)
//     .then(res => {
//       if (res.status !== 'ok') {
//         dispatch(AC.loginingMistakeInInputAC(res.message.password));
//         return;
//       }

//       dispatch(AC.loginingSeccassAC(res.message.token));
//     })
//     .catch(err => dispatch(AC.loginingFailureAC(err)));
// };

// export default { loginingThunk };
