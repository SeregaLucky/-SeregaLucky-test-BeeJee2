/* import - node_modules */
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';

/* import - rootReducer */
import rootReducer from './rootReducer';

const middlewares = [thunk];

const store = configureStore({
  reducer: rootReducer,
  middleware: middlewares,
});

const persistor = persistStore(store);

export default { store, persistor };

//
//
//
//

/*
 * When a do not use '@reduxjs/toolkit'
 */
// /* import - node_modules */
// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import { persistStore } from 'redux-persist';
// import { composeWithDevTools } from 'redux-devtools-extension';
// /* import - rootReducer */
// import rootReducer from './rootReducer';

// const middlewares = [thunk];

// const enhancer = composeWithDevTools(applyMiddleware(...middlewares));

// const store = createStore(rootReducer, enhancer);

// const persistor = persistStore(store);

// export default { store, persistor };
