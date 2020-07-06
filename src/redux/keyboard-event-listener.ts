import { Store } from 'redux';
import { Keyboard } from 'react-native';

export function registerKeyboardEventListener(store: Store) {
  Keyboard.addListener('keyboardDidShow', () => {
    store.dispatch({
      type: '_transient/keyboardOpened',
    });
  });
  Keyboard.addListener('keyboardDidHide', () => {
    store.dispatch({
      type: '_transient/keyboardClosed',
    });
  });
}
