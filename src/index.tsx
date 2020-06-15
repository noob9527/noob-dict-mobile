import 'react-native-gesture-handler';

import { RootRouter } from './views/root-router';
import { Provider } from 'react-redux';
import { configureStore } from './redux/configure-store';
import React from 'react';

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <RootRouter/>
  </Provider>
);

export default App;
