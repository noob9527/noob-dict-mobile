import { call, put } from '@redux-saga/core/effects';
import { Model } from '../../redux/model-manager';
import logger from '../../utils/logger';
import { rendererContainer } from '../../services/impl/renderer-container';
import { UserService, UserServiceToken } from '../../services/user-service';

const userService = rendererContainer.get<UserService>(UserServiceToken);


export interface ProfileState {
  loginRequesting: boolean
}

export interface ProfileModel extends Model {
  state: ProfileState
}

const effects = {
  * loginCodeReceived(action) {
    const { payload } = action;

    yield put({
      type: 'profile/mergeState',
      payload: {
        loginRequesting: true
      },
    });

    let user = null;
    try {
      user = yield call([userService, userService.login], payload.code, payload.loginOption);
    } catch (e) {
      logger.error('fail to fetch user info');
    }
    if (!user) return;
    yield put({
      type: 'root/loginSuccess',
      payload: { user },
    });
    yield put({
      type: 'profile/mergeState',
      payload: {
        loginRequesting: false,
      },
    });
    yield put({
      type: 'history/setStale',
      payload: {
        stale: true,
      }
    });
  },
  * logout() {
    yield put({
      type: 'root/mergeState',
      payload: { currentUser: null },
    });
    yield call([userService, userService.logout]);
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

export const profileModel: ProfileModel = {
  namespace: 'profile',
  state: {
    loginRequesting: false,
  },
  effects,
  reducers,
};

