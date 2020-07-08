import 'reflect-metadata';
import 'react-native-gesture-handler';
import './services/impl/index';

import { Provider } from 'react-redux';
import { configureStore } from './redux/configure-store';
import React from 'react';
import { RootView } from './views/root-view';

const store: any = configureStore();

store.dispatch({ type: 'root/init' });

const App = () => {
  return (
    <Provider store={store}>
      {/*<PersistGate loading={<ActivityIndicator/>} persistor={store.persistor}>*/}
      <RootView/>
      {/*</PersistGate>*/}
    </Provider>
  );
};

export default App;
