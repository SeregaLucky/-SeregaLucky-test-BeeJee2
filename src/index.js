/* import - node_module */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
/* import - CSS */
import './index.css';
import mainStore from './redux/store';
/* import - COMPONENT */
import App from './components/App/App';

ReactDOM.render(
  <Provider store={mainStore.store}>
    <PersistGate persistor={mainStore.persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);
