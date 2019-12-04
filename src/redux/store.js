// import { createStore, applyMiddleware, combineReducers } from 'redux';
// import thunk from 'redux-thunk';
// import { persistStore } from 'redux-persist';
// import { composeWithDevTools } from 'redux-devtools-extension';

// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

// import rootReducer from './rootReducer';

// const middlewares = [thunk];
// const enhancer = composeWithDevTools(applyMiddleware(...middlewares));
// const store = createStore(rootReducer, enhancer);

// const persistor = persistStore(store);

// export default { store, persistor };

//
//
//
//

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
{
  //     import { createStore, applyMiddleware } from 'redux';
  // import thunk from 'redux-thunk';
  // import { persistStore } from 'redux-persist';
  // import { composeWithDevTools } from 'redux-devtools-extension';
  // import rootReducer from './rootReducer';
  // const middlewares = [thunk];
  // const enhancer = composeWithDevTools(applyMiddleware(...middlewares));
  // const store = createStore(rootReducer, enhancer);
  // const persistor = persistStore(store);
  // export default { store, persistor };
}
