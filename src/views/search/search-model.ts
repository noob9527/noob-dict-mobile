import { put } from '@redux-saga/core/effects';
import { Model } from '../../redux/model-manager';

export const SPLIT_PANE_SIZE_MAX = 450;
export const SPLIT_PANE_SIZE_MIN = 60;
export const SPLIT_PANE_SIZE_MIDDLE = (400 + 60) / 2;

export interface SearchState {
  pinned: boolean
  splitPaneSize: number
  splitPaneButtonUp: boolean
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
  updatePanelSize(state, action: any) {
    const { splitPaneSize } = action.payload;
    return {
      ...state,
      splitPaneSize,
      splitPaneButtonUp: splitPaneSize <= SPLIT_PANE_SIZE_MIDDLE,
    };
  },
  togglePaneSize(state) {
    const { splitPaneButtonUp } = state;
    const splitPaneSize = splitPaneButtonUp ? SPLIT_PANE_SIZE_MAX : SPLIT_PANE_SIZE_MIN;
    return {
      ...state,
      splitPaneSize,
      splitPaneButtonUp: !splitPaneButtonUp,
    };
  },
};

export const searchModel: SearchModel = {
  namespace: 'search',
  state: {
    pinned: false,
    splitPaneSize: SPLIT_PANE_SIZE_MIN,
    splitPaneButtonUp: true,
  },
  effects,
  reducers,
};

