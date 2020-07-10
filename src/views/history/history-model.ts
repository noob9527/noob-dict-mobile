import { call, put, select } from '@redux-saga/core/effects';
import { rendererContainer } from '../../services/impl/renderer-container';
import { Model } from '../../redux/model-manager';
import { RootState } from '../root-model';
import moment from 'moment';
import logger from '../../utils/logger';
import { NoteService, NoteServiceToken, NoteUpdateAtSearchParam } from '../../services/db/note-service';
import { INote } from '../../model/note';

const noteService = rendererContainer.get<NoteService>(NoteServiceToken);
const log = logger.getLogger('historyModel');

export interface HistoryState {
  stale: boolean,
  searchParams: NoteUpdateAtSearchParam,
  notes: INote[],
}

export interface HistoryModel extends Model {
  state: HistoryState
}

const state: HistoryState = {
  stale: true,
  searchParams: {
    user_id: '',
    updateAtBetween: {
      lowerBound: moment().subtract(1, 'years').valueOf(),
    },
  },
  notes: [],
};
const effects = {
  * fetchLatestNotes() {
    const rootState: RootState = yield select((state: any) => state.root);
    const historyState: HistoryState = yield select((state: any) => state.history);
    const { searchParams } = historyState;
    searchParams.user_id = rootState?.currentUser?.id ?? '';
    let notes = yield call([noteService, noteService.searchByUpdateAt], searchParams);
    notes = yield call([noteService, noteService.join_histories], notes);
    log.debug('fetchLatestNotes size: ', notes.length);
    yield put({
      type: 'history/mergeState',
      payload: {
        stale: false,
        notes,
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

export const historyModel: HistoryModel = {
  namespace: 'history',
  state,
  effects,
  reducers,
};

