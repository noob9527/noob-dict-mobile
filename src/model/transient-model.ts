import { Model } from '../redux/model-manager';
import { Keyboard } from 'react-native';
import { put } from '@redux-saga/core/effects';


export interface TransientState {
  appState: string
  isKeyboardOpen: boolean
}

interface TransientModel extends Model {
  state: TransientState
}

const state: TransientState = {
  appState: 'active',
  isKeyboardOpen: false,
};


const effects = {
  * closeKeyboard() {
    Keyboard.dismiss();
  },
  // use reducer instead?
  * appStateChange(action) {
    yield put({
      type: '_transient/mergeState',
      payload: {
        appState: action?.payload?.appState ?? state.appState,
      },
    });
  },
  * appComeToForeground() {
    yield put({
      type: 'root/debouncedSyncHistories',
    });
  },
};

const reducers = {
  mergeState(state, action: any) {
    return {
      ...state,
      ...action.payload,
    };
  },
  appStateChange(state, action: any) {
    return {
      ...state,
      appState: action?.payload?.appState ?? state.appState,
    };
  },
  keyboardOpened(state) {
    return {
      ...state,
      isKeyboardOpen: true,
    };
  },
  keyboardClosed(state) {
    return {
      ...state,
      isKeyboardOpen: false,
    };
  },
};

export const transientModel: TransientModel = {
  namespace: '_transient',
  state,
  effects,
  reducers,
};

