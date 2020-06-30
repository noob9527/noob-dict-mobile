import { ModelManager } from './model-manager';
import * as models from '../views/models';
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { reduxPersistStoreEnhancer } from './persist/redux-persist-store-enhancer';


export function configureStore() {
  const manager = new ModelManager();

  Object.values(models).forEach((e) => {
    manager.addModel(e);
  });

  const sagaMiddleware = createSagaMiddleware();
  //@ts-ignore
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    manager.createRootReducer(),
    manager.state,
    composeEnhancers(
      applyMiddleware(
        sagaMiddleware,
      ),
      reduxPersistStoreEnhancer,
    ),
  );

  sagaMiddleware.run(manager.createRootSaga());

  return store;
}
