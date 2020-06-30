import React from 'react';
import { getStoredState } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import { REHYDRATE } from 'redux-persist/es/constants';
import { createReduxPersistStoreEnhancer } from './create-redux-persist-store-enhancer';
import { Store } from 'redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ActivityIndicator } from 'react-native';

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: [
    // note this blacklist and whitelist only work one level deep
    // https://github.com/rt2zz/redux-persist#nested-persists
    'router',
    '_transient',
  ],
};

const reduxPersistStoreEnhancer = createReduxPersistStoreEnhancer(rootPersistConfig);

/**
 * e.g.
 * // listen storage event
 * window.addEventListener(
 *   'storage',
 *   createStorageEventHandler(store),
 *   false,
 * );
 * @param store
 */
function createStorageEventHandler(store: Store) {
  async function handleStorageEvent(event: StorageEvent) {
    // if (event.key == null) return; // this means clearItems is called
    if (!event.key || event.key === 'redux-persist localStorage test') return;
    const storedState = await getStoredState(rootPersistConfig);
    store.dispatch({
      type: REHYDRATE,
      key: rootPersistConfig.key,
      payload: storedState,
    });
  }

  return handleStorageEvent;
}

/**
 * e.g.
 * <Provider store={store}>
 *   {createPersistGate(store, props, history)}
 * </Provider>
 * @param store
 * @param props
 * @param history
 */
function createPersistGate(store, props, history) {
  return (
    <PersistGate loading={<ActivityIndicator/>} persistor={store.persistor}>
      {props.children}
    </PersistGate>
  );
}

export {
  rootPersistConfig,
  reduxPersistStoreEnhancer,
  createStorageEventHandler,
  createPersistGate,
};
