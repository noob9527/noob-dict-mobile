import { dark } from '../theme/dark';
import { call, put } from '@redux-saga/core/effects';
import { END, eventChannel } from 'redux-saga';
import { setInterval } from 'timers';
import { User } from '../model/user';
import { Model } from '../redux/model-manager';
import { UserService, UserServiceToken } from '../services/user-service';
import { rendererContainer } from '../services/impl/renderer-container';

// const appService = rendererContainer.get<AppService>(AppServiceToken);
const userService = rendererContainer.get<UserService>(UserServiceToken);
// const loginUiService = rendererContainer.get<LoginUiService>(LoginUiServiceToken);
// const globalHistoryService = rendererContainer.get<GlobalHistoryService>(GlobalHistoryServiceToken);

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
    const user = yield call([userService, userService.fetchCurrentUserFromStorage]);
    console.log('loadCurrentUser');
    put({
      type: 'root/mergeState',
      payload: {
        currentUser: user,
      },
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
  // sagas: [watchClockEvent],
};

export default rootModel;

// call sync for each hour
const DURATION = 1000 * 60 * 60;

/**
 * call sync histories for each DURATION
 * it's just an example shows how to setInterval in redux-saga way
 * we do not actually need it, in fact, we just need to syncHistories one time after app initialized
 * see:
 * https://github.com/redux-saga/redux-saga/blob/master/docs/advanced/Channels.md#using-the-eventchannel-factory-to-connect-to-external-events
 */
export function* watchClockEvent() {
  // const chan = yield call(interval, Number.MAX_SAFE_INTEGER);
  // try {
  //   while (true) {
  //     // take(END) will cause the saga to terminate by jumping to the finally block
  //     if (Runtime.isDev) {
  //       // in dev mode
  //       // we do not sync history after app initilized
  //       yield take(chan);
  //       yield call([globalHistoryService, globalHistoryService.syncHistories]);
  //     } else {
  //       yield call([globalHistoryService, globalHistoryService.syncHistories]);
  //       yield take(chan);
  //     }
  //     // let times = yield take(chan);
  //     // console.log(`times: ${times}`);
  //   }
  // } finally {
  //   // 'clock terminated'
  // }
}

function interval(maxTime: number) {
  let times = 0;
  return eventChannel(emitter => {
      const iv = setInterval(() => {
        times++;
        if (times >= maxTime) {
          // this causes the channel to close
          emitter(END);
        } else {
          emitter(times);
        }
      }, DURATION);
      // The subscriber must return an unsubscribe function
      return () => {
        clearInterval(iv);
      };
    },
  );
}
