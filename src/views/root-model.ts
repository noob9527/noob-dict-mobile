import { dark } from '../theme/dark';
import { call, put } from '@redux-saga/core/effects';
import { User } from '../model/user';
import { Model } from '../redux/model-manager';
import { UserService, UserServiceToken } from '../services/user-service';
import { rendererContainer } from '../services/impl/renderer-container';
import { GlobalHistoryService, GlobalHistoryServiceToken } from '../services/global-history-service';
import logger from '../utils/logger';

// const appService = rendererContainer.get<AppService>(AppServiceToken);
const userService = rendererContainer.get<UserService>(UserServiceToken);
const globalHistoryService = rendererContainer.get<GlobalHistoryService>(GlobalHistoryServiceToken);
const log = logger.getLogger('rootModel');


export interface RootState {
  theme: any
  app: {
    // version: String
  }
  currentUser: User | null | undefined
}

export interface RootModel extends Model {
  state: RootState
}

const effects = {
  * loadCurrentUser() {
    log.debug('loadCurrentUser');
    const user = yield call([userService, userService.fetchCurrentUserFromStorage]);
    yield put({
      type: 'root/mergeState',
      payload: {
        currentUser: user,
      },
    });
  },
  * syncHistories() {
    yield call([globalHistoryService, globalHistoryService.syncHistories]);
    // set stale flag
    yield put({
      type: 'history/mergeState',
      payload: {
        stale: true,
      },
    });
  },
  * init() {
    log.debug('app init');
    yield put({
      type: 'root/loadCurrentUser',
    });
  },
};

const reducers = {
  loginSuccess(state, action: any) {
    return {
      ...state,
      currentUser: action.payload.user,
    };
  },
  mergeState(state, action: any) {
    return {
      ...state,
      ...action.payload,
    };
  },
};

const rootModel: RootModel = {
  namespace: 'root',
  state: {
    theme: dark,
    app: {
      // version: appService.getVersion()
    },
    currentUser: null,
  },
  effects,
  reducers,
  sagas: [],
};

export default rootModel;

