import 'reflect-metadata';
import 'react-native-gesture-handler';
import './services/impl/index';

import { Provider } from 'react-redux';
import { configureStore } from './redux/configure-store';
import React from 'react';
import { RootView } from './views/root-view';
import { PersistGate } from 'redux-persist/integration/react';
import { ActivityIndicator } from 'react-native';

const store: any = configureStore();

const App = () => (
  <Provider store={store}>
    <PersistGate loading={<ActivityIndicator/>} persistor={store.persistor}>
      <RootView/>
    </PersistGate>
  </Provider>
);

export default App;
