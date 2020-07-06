import { Model } from '../redux/model-manager';
import { Keyboard } from 'react-native';


export interface TransientState {
  isKeyboardOpen: boolean
}

interface TransientModel extends Model {
  state: TransientState
}

const state: TransientState = {
  isKeyboardOpen: false,
};


const effects = {
  * closeKeyboard() {
    Keyboard.dismiss();
  },
};

const reducers = {
  mergeState(state, action: any) {
    return {
      ...state,
      ...action.payload,
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

