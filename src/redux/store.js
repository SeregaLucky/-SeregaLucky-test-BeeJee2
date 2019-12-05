import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './rootReducer';

const middlewares = [thunk];
const enhancer = composeWithDevTools(applyMiddleware(...middlewares));
const store = createStore(rootReducer, enhancer);
const persistor = persistStore(store);

export default { store, persistor };
