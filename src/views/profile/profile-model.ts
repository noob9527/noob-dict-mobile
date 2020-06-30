import { call, put } from '@redux-saga/core/effects';
import { Model } from '../../redux/model-manager';
import logger from '../../utils/logger';
import { rendererContainer } from '../../services/impl/renderer-container';
import { UserService, UserServiceToken } from '../../services/user-service';

const userService = rendererContainer.get<UserService>(UserServiceToken);


export interface ProfileState {
}

export interface ProfileModel extends Model {
  state: ProfileState
}

const effects = {
  * loginCodeReceived(action) {
    const { payload } = action;
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
  },
  * logout() {
    yield put({
      type: 'root/mergeState',
      payload: { currentUser: null },
    });
    yield call([userService, userService.logout]);
  },
};

const reducers = {};

export const profileModel: ProfileModel = {
  namespace: 'profile',
  state: {
  },
  effects,
  reducers,
};

