import 'react-native-gesture-handler';

import { Provider } from 'react-redux';
import { configureStore } from './redux/configure-store';
import React from 'react';
import { RootView } from './views/root-view';

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <RootView/>
  </Provider>
);

export default App;
