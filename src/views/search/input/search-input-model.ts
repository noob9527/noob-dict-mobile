import { Suggest } from '@noob9527/noob-dict-core';
import { call, cancel, delay, fork, put, take, select } from '@redux-saga/core/effects';
import { Model } from '../../../redux/model-manager';
import { SearchService, SearchServiceToken } from '../../../services/search-service';
import { rendererContainer } from '../../../services/impl/renderer-container';
import { RootState } from '../../root-model';

export interface SearchInputState {
  text: string,
  suggests: Suggest[],
  loadingSuggests: boolean,
  open: boolean,
}

export interface SearchInputModel extends Model {
  state: SearchInputState
}

const state: SearchInputState = {
  text: '',
  suggests: [],
  loadingSuggests: false,
  open: false,
};

const effects = {
  // manually input search text
  * inputSearchText(action) {
    yield put({
      type: 'searchInput/mergeState',
      payload: {
        loadingSuggests: true,
      },
    });
  },
  // manually input search text or select value from suggests
  * searchTextChange(action) {
    yield put({
      type: 'searchInput/mergeState',
      payload: {
        text: action?.text,
        // reset suggests after an option is selected
        suggests: [],
      },
    });
  },
  * fetchSuggests(action) {
    const rootState: RootState = yield select(state => state.root);
    const searchService = rendererContainer.get<SearchService>(SearchServiceToken);
    // const suggests = yield call([searchService, searchService.fetchSuggests], action.text, rootState.currentUser?.id ?? '');
    console.log(action);
    const suggests = yield call([searchService, searchService.fetchSuggests], action.text, '');
    yield put({
      type: 'searchInput/mergeState',
      payload: {
        suggests,
        loadingSuggests: false,
      },
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

export const searchInputModel: SearchInputModel = {
  namespace: 'searchInput',
  state,
  effects,
  reducers,
  sagas: [watchSearchTextChange],
};

function* watchSearchTextChange() {
  yield fork(function* () {
    let task;
    while (true) {
      const action = yield take('searchInput/inputSearchText');
      if (task) {
        yield cancel(task);
      }
      task = yield fork(debouncedFetchSuggests, action);
    }
  });

  function* debouncedFetchSuggests(action) {
    yield delay(300);
    yield put({
      ...action,
      type: 'searchInput/fetchSuggests',
    });
  }
}