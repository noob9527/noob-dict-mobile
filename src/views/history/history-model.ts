import { call, fork, put, select, take } from '@redux-saga/core/effects';
import { rendererContainer } from '../../services/impl/renderer-container';
import { HistoryCreateAtSearchParam, HistoryService, HistoryServiceToken } from '../../services/db/history-service';
import { ISearchHistory } from '../../model/history';
import { Model } from '../../redux/model-manager';
import { RootState } from '../root-model';
import moment from 'moment';
import logger from '../../utils/logger';

const historyService = rendererContainer.get<HistoryService>(HistoryServiceToken);
const log = logger.getLogger('historyModel');

export interface HistoryState {
  stale: boolean,
  searchParams: HistoryCreateAtSearchParam,
  histories: ISearchHistory[],
}

export interface HistoryModel extends Model {
  state: HistoryState
}

const state: HistoryState = {
  stale: true,
  searchParams: {
    user_id: '',
    createAtBetween: {
      lowerBound: moment().subtract(1, 'years').valueOf(),
    },
  },
  histories: [],
};
const effects = {
  * fetchLatestHistories(action) {
    const rootState: RootState = yield select((state: any) => state.root);
    const historyState: HistoryState = yield select((state: any) => state.history);
    const { searchParams } = historyState;
    searchParams.user_id = rootState?.currentUser?.id ?? '';
    console.log('user id', searchParams.user_id)
    let histories = yield call([historyService, historyService.searchByCreateAt], searchParams);
    log.debug('fetchLatestHistories size: ', histories.length);
    yield put({
      type: 'history/mergeState',
      payload: {
        stale: false,
        histories,
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

