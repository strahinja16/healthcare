
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import immutableTransform from 'redux-persist-transform-immutable';
import storage from 'redux-persist/lib/storage';
import auth from './auth';
import breadcrumb from './breadcrumb';
import user from './users';
import patient from './patient';
import prescription from './prescription';
import examination from './examination';
import charts from './charts';

const persistConfig = {
  key: 'root',
  transforms: [immutableTransform()],
  storage,
  whitelist: ['auth'],
};

const combinedReducers = combineReducers({
  auth,
  breadcrumb,
  user,
  patient,
  prescription,
  examination,
  charts
});

export default persistReducer(persistConfig, combinedReducers);
