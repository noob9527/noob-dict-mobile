import { put } from '@redux-saga/core/effects';
import { Model } from '../../redux/model-manager';

export interface SearchState {
}

export interface SearchModel extends Model {
  state: SearchState
}

interface SearchAction {
  type: 'search/search',
  payload: {
    text: string
    engine?: string
  }
}

const effects = {
  * search(action: SearchAction) {
    yield put({
      type: 'searchInput/searchTextChange',
      text: action.payload.text,
    });
    yield put({
      type: 'searchPanel/fetchResults',
      text: action.payload.text,
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
};

export const searchModel: SearchModel = {
  namespace: 'search',
  state: {
    showSearchNote: false,
  },
  effects,
  reducers,
};

