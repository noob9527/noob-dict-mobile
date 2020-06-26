import 'reflect-metadata';
import 'react-native-gesture-handler';
import './services/impl/index';

import { Provider } from 'react-redux';
import { configureStore } from './redux/configure-store';
import React from 'react';
import { RootView } from './views/root-view';
import { GithubLoginView } from './views/setting/github-login-view';

const store = configureStore();

const App = () => (
  <GithubLoginView/>
// <Provider store={store}>
//     <GithubLoginView/>
//     {/*<RootView/>*/}
//   </Provider>
);

export default App;
