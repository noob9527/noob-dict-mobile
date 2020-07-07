import { Suggest } from '@noob9527/noob-dict-core';
import { call, cancel, delay, fork, put, take, select } from '@redux-saga/core/effects';
import { Model } from '../../../redux/model-manager';
import { SearchService, SearchServiceToken } from '../../../services/search-service';
import { rendererContainer } from '../../../services/impl/renderer-container';
import { RootState } from '../../root-model';
import { NoteService, NoteServiceToken } from '../../../services/db/note-service';

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
    console.log(action);
    yield put({
      type: 'searchInput/mergeState',
      payload: {
        text: action?.text,
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
    const noteService = rendererContainer.get<NoteService>(NoteServiceToken);
    const { text } = action;
    let suggests: Suggest[];

    if (text) {
      suggests = yield call([searchService, searchService.fetchSuggests], action.text, rootState.currentUser?.id ?? '');
    } else {
      // if text is empty, we fetch suggests from notes
      const notes = yield call([noteService, noteService.fetchLatest], 20, rootState.currentUser?.id ?? '');
      suggests = notes.map(e => {
        const firstMeaning = e.search_result?.definitions[0]?.meanings[0];
        return {
          entry: e.text,
          explain: firstMeaning?.ZH ?? firstMeaning?.EN,
        };
      });
    }

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
