import database from './database';
import { injectable } from 'inversify';
import { v4 as uuidv4 } from 'uuid';
import logger from '../../../utils/logger';
import { HistoryCreateAtSearchParam, HistoryService, HistoryUpdateAtSearchParam } from '../../db/history-service';
import { ISearchHistory, SearchHistory } from '../../../model/history';

@injectable()
export class HistoryServiceImpl implements HistoryService {
  private log = logger.getLogger(HistoryServiceImpl.name);

  findAll(text: string, user_id: string): Promise<ISearchHistory[]> {
    return new Promise(((resolve, reject) => {
      database.transaction(tx => {
        tx.executeSql(
          'select * from histories where text = ? and user_id = ?',
          [text, user_id],
          (tx, res) => {
            const items = Array.from({ length: res.rows.length }).map((e, i) => {
              return res.rows.item(i);
            }).map(e => SearchHistory.wrap(e));
            resolve(items);
          });
      }, (error) => {
        this.log.error(error);
        reject(error);
      });
    }));
  }

  add(history: ISearchHistory): Promise<ISearchHistory> {
    this.log.debug(this.add.name, history);

    const now = new Date().valueOf();
    history.create_at = history.create_at ?? now;
    history.update_at = history.update_at ?? now;
    history.id = history.id ?? uuidv4();

    return new Promise(((resolve, reject) => {
      database.transaction(tx => {
        tx.executeSql(
          'select * from histories where text = ? and user_id = ?',
          [],
          (tx, res) => {
          });
      }, (error) => {
        this.log.error(error);
        reject(error);
      });
    }));
  }

  update(history: ISearchHistory): Promise<ISearchHistory> {
    history.update_at = new Date().valueOf();

    return new Promise(((resolve, reject) => {
      database.transaction(tx => {
        tx.executeSql(
          'select * from histories where text = ? and user_id = ?',
          [],
          (tx, res) => {
          });
      }, (error) => {
        this.log.error(error);
        reject(error);
      });
    }));
  }

  fetchSourceSuggest(text: string, user_id: string): Promise<string[]> {
    return Promise.resolve([]);
  }

  searchByCreateAt(param: HistoryCreateAtSearchParam): Promise<ISearchHistory[]> {
    return Promise.resolve([]);
  }

  searchByUpdateAt(param: HistoryUpdateAtSearchParam): Promise<ISearchHistory[]> {
    return Promise.resolve([]);
  }


}
