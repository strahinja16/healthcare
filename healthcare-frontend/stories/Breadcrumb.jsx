import React from 'react';
import { storiesOf } from '@storybook/react';
import { Provider } from 'react-redux';
import '../src/loader';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../src/reducers';
import Breadcrumb from '../src/components/elements/Breadcrumb';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducers);


storiesOf('Breadcrumb', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('default', () => (
    <Breadcrumb />
  ));
