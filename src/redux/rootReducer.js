/* import - node_modules */
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

/* import - reducers */
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

const rootReducer = combineReducers({
  tasks: persistReducer(tasksPersistConfig, tasksReducers),
  login: persistReducer(LoginPersistConfig, loginReducers),
});

export default rootReducer;
