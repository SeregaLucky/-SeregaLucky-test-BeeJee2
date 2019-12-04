import { combineReducers } from 'redux';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import tasksReducers from './tasks/tasksReducers';
import loginReducers from './login/loginReducer';

const LoginPersistConfig = {
  key: 'login',
  storage,
  whitelist: ['token'],
};

const tasksPersistConfig = {
  key: 'tasks',
  storage,
  whitelist: ['idsItemsChangeText'],
};

// export default combineReducers({
//   tasks: tasksReducers,
//   login: loginReducers,
// });

const rootReducer = combineReducers({
  // tasks: tasksReducers,
  tasks: persistReducer(tasksPersistConfig, tasksReducers),
  login: persistReducer(LoginPersistConfig, loginReducers),
});

export default rootReducer;

// export default persistReducer(persistConfig, rootReducer);

//
//
//
//

//
//
//
//

//
//
//
//

// import { combineReducers } from 'redux';

// // import { persistReducer } from 'redux-persist';
// // import storage from 'redux-persist/lib/storage';

// import tasksReducers from './tasks/tasksReducers';
// import loginReducers from './login/loginReducer';

// // const persistConfig = {
// //   key: 'auth',
// //   storage,
// //   whitelist: ['login'],
// // };

// export default combineReducers({
//   tasks: tasksReducers,
//   login: loginReducers,
// });

// // const rootReducer = combineReducers({
// //   tasks: tasksReducers,
// //   login: loginReducers,
// // });

// // export default persistReducer(persistConfig, rootReducer);
