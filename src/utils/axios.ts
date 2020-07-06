import axios from 'axios';
import { ApiConfig } from '../config/api';

axios.defaults.baseURL = ApiConfig.baseUrl;

let currentUser;

export function registerUserChangeListener(store) {
  store.subscribe(() => {
    const previousValue = currentUser;
    currentUser = select(store.getState());
    if (previousValue !== currentUser) {
      axios.defaults.headers.common.tokenHeader = currentUser?.id_token ?? '';
    }
  });
}

function select(state) {
  return state.root.currentUser;
}
