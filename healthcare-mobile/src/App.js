import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { Root } from 'native-base';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import Router from './routes';
import RequestHelpSubscribe from './components/RequestHelpSubscribe';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducers);
const persisted = persistStore(store);

const App = () => (
  <Root>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persisted}>
          <Router />
          <RequestHelpSubscribe />
      </PersistGate>
    </Provider>
  </Root>
);

export default App;
