import { injectable } from 'inversify';
import axios from 'axios';
import { HistoryService, HistoryServiceToken } from '../db/history-service';
import { NoteService, NoteServiceToken } from '../db/note-service';
import { GlobalHistoryService, SyncHistoriesRequest, SyncHistoriesResponse } from '../global-history-service';
import { UserService, UserServiceToken } from '../user-service';
import logger from '../../utils/logger';
import { rendererContainer } from './renderer-container';
import { SearchHistory } from '../../model/history';
import { ApiConfig } from '../../config/api';
import { string2date } from '../../utils/date';

@injectable()
export class GlobalHistoryServiceImpl implements GlobalHistoryService {
  private historyService: HistoryService;
  private noteService: NoteService;
  private userService: UserService;
  private log = logger.getLogger('GlobalHistoryServiceImpl');

  constructor() {
    this.historyService = rendererContainer.get<HistoryService>(HistoryServiceToken);
    this.noteService = rendererContainer.get<NoteService>(NoteServiceToken);
    this.userService = rendererContainer.get<UserService>(UserServiceToken);
  }

  async syncHistories() {
    const methodLogger = this.log.getLogger('syncHistories');
    methodLogger.debug('start sync histories');

    const currentUser = await this.userService.fetchCurrentUserFromStorage();
    if (!currentUser) {
      methodLogger.debug('sync terminated as no logged in user');
      return;
    }
    // select histories where update time greater than last_sync_time
    const lastSyncTime = await this.getLastSyncTime();
    const histories = await this.historyService.searchByUpdateAt({
      user_id: currentUser.id,
      updateAtBetween: {
        lowerBound: lastSyncTime.valueOf(),
      },
    });

    methodLogger.debug('send item size', histories.length);
    const res = await this.sync2server({
      clientLastSyncTime: lastSyncTime.valueOf(),
      itemSinceLastSync: histories,
    });
    methodLogger.debug('receive item size', res.itemSinceLastSync.length);

    // const promises = [this.noteService.syncHistory(res.itemSinceLastSync[0])];
    const promises = res.itemSinceLastSync.map(history => {
      return this.noteService.syncHistory(history);
    });
    for (const promise of promises) {
      await promise;
    }
    // await Promise.all(promises);

    // update last sync time
    await this.updateLastSyncTime(string2date(res.serverLastSyncTime));

    methodLogger.debug('end sync histories');
  }

  async sync2server(request: SyncHistoriesRequest): Promise<SyncHistoriesResponse> {
    const methodLogger = this.log.getLogger(this.sync2server.name);
    methodLogger.debug('request', request);

    const res = await axios.patch(`${ApiConfig.baseUrl}/histories`, request);
    const data = res.data as SyncHistoriesResponse;
    // wrap history
    console.log(11111111111111111111111111111);
    console.log(data.itemSinceLastSync[0]);
    data.itemSinceLastSync = data.itemSinceLastSync.map(e => SearchHistory.wrap(e));
    console.log(22222222222222222222222222222);
    console.log(data.itemSinceLastSync[0]);
    return data;
  }

  async getLastSyncTime(): Promise<Date> {
    const user = await this.userService.fetchCurrentUserFromStorage();
    return new Date(user!!.last_sync_time);
  }

  async updateLastSyncTime(date: Date): Promise<void> {
    await this.userService.patchCurrentUser({
      last_sync_time: date.toISOString(),
    });
    return;
  }

}
