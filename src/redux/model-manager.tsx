import { Action, AnyAction, combineReducers, Reducer, ReducersMapObject } from 'redux';
import { Saga } from 'redux-saga';
import React from 'react';
import { all, takeEvery } from '@redux-saga/core/effects';

export interface Model {
  namespace: string
  state?: any
  reducers?: ReducersMapObject
  // effects are watched via takeEvery
  effects?: EffectsMapObject
  sagas?: Saga[]
}

export type Effect<T extends AnyAction> = (action: T) => void;

export interface EffectsMapObject {
  [key: string]: Effect<any>,
}

export class ModelManager {
  state: any = {};  // globalState
  effects: EffectsMapObject = {};
  sagas: Saga[] = [];
  reducers: ReducersMapObject = {};

  addModel(model: Model) {
    this.initState(model.namespace, model.state);
    this.addReducers(model.namespace, model.reducers ?? {}, model.state);
    if (model.effects) this.addEffects(model.namespace, model.effects);
    if (model.sagas) this.addSagas(model.sagas);
  }

  initState(namespace: string, state: any) {
    this.state[namespace] = state;
  }

  addReducers(namespace: string, reducers: ReducersMapObject, initState: any) {
    this.reducers[namespace] = (state = initState, action: Action) => {
      if (!action.type.startsWith(namespace)) return state;
      // convert namespace/action to action
      const key = action.type.slice(namespace.length + 1);

      const modelReducer = reducers[key];
      if (modelReducer) {
        return modelReducer(state, action);
      } else {
        return state;
      }
    };
    return this;
  }

  addEffects(namespace: string, effects: EffectsMapObject) {
    const _effects = Object.entries(effects)
      .map(([key, effect]: [string, any]) => {
        return function* () {
          yield takeEvery(`${namespace}/${key}`, effect);
        };
      });
    this.effects[namespace] = function* () {
      yield all(_effects.map(e => e()));
    };
    return this;
  }

  addSagas(sagas: Saga[]) {
    this.sagas = this.sagas.concat(sagas);
    return this;
  }

  createRootReducer(): Reducer {
    return combineReducers(this.reducers);
  }

  createRootSaga(): Saga {
    const self = this;
    return function* () {
      yield all([
        ...Object.values(self.effects).map((e: any) => e()),
        ...self.sagas.map((e: any) => e()),
      ]);
    };
  }
}

