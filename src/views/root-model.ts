import { dark } from '../theme/dark';
import { call, put, select, take } from '@redux-saga/core/effects';
import { User } from '../model/user';
import { Model } from '../redux/model-manager';
import { UserService, UserServiceToken } from '../services/user-service';
import { rendererContainer } from '../services/impl/renderer-container';
import { GlobalHistoryService, GlobalHistoryServiceToken } from '../services/global-history-service';
import logger from '../utils/logger';
import moment from 'moment';

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
      type: 'root/loadCurrentUserSuccess',
      payload: {
        user,
      },
    });
  },
  * debouncedSyncHistories() {
    const rootState: RootState = yield select(state => state.root);
    const { currentUser } = rootState;
    logger.log('debouncedSyncHistories, last sync time:', currentUser?.last_sync_time);

    if (currentUser != null) {
      const lastTime = moment(currentUser.last_sync_time);
      const syncHistoryThreshold = 10; // unit minutes
      const minutes = moment().diff(lastTime, 'minute');

      if (minutes < syncHistoryThreshold) {
        logger.log(`last sync time: ${lastTime}, duration: ${minutes}, won't sync history`);
      } else {
        logger.log(`last sync time: ${lastTime}, duration: ${minutes}, about to sync history`);
        yield put({
          type: 'root/syncHistories',
        });
      }
    }
  },
  * syncHistories() {
    yield call([globalHistoryService, globalHistoryService.syncHistories]);

    // load current user to refresh last sync time
    yield put({
      type: 'root/loadCurrentUser',
    });
    // set stale flag
    yield put({
      type: 'history/setStale',
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
    // mimic blocking call as put is non-blocking
    // https://redux-saga.js.org/docs/Glossary.html
    yield take('root/loadCurrentUserSuccess');
    yield put({
      type: 'root/debouncedSyncHistories',
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
  loadCurrentUserSuccess(state, action: any) {
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

