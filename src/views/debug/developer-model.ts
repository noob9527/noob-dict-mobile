import { put, select } from '@redux-saga/core/effects';
import { Model } from '../../redux/model-manager';
import { RootState } from '../root-model';
import { GlobalHistoryService, GlobalHistoryServiceToken } from '../../services/global-history-service';
import { rendererContainer } from '../../services/impl/renderer-container';

const globalHistoryService = rendererContainer.get<GlobalHistoryService>(GlobalHistoryServiceToken);

const effects = {
  * resetLastSyncTime() {
    const rootState: RootState = yield select(state => state.root);
    const { currentUser } = rootState;
    if (currentUser == null) return;

    const lastSyncTime = new Date(0);
    globalHistoryService.updateLastSyncTime(lastSyncTime);
    currentUser.last_sync_time = lastSyncTime.toISOString();
    yield put({
      type: 'root/mergeState',
      payload: {
        user: currentUser,
      },
    });
  },
};

const reducers = {};

export const developerModel: Model = {
  namespace: 'developer',
  state: {},
  effects,
  reducers,
};
