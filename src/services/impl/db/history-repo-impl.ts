import { ISearchHistory, SearchHistory } from '../../../model/history';
import database from './database';
import logger from '../../../utils/logger';
import { HistoryCreateAtSearchParam, HistoryQuery, HistoryUpdateAtSearchParam } from '../../db/history-service';
import { HistoryRepo } from '../../db/history-repo';
import { injectable } from 'inversify';

const historyInsertSql = `
insert into histories 
  (
    id,
    user_id,
    text,
    context_paragraph,
    context_source,
    create_at,
    update_at,
    search_result
  ) 
  values
  (
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?
  )
`;

const historyUpdateSql = `
update histories 
set 
  user_id = ?,
  text = ?,
  context_paragraph = ?,
  context_source = ?,
  create_at = ?,
  update_at = ?,
  search_result = ?
where id = ?
`;

function row2obj(e: any) {
  return SearchHistory.wrap({
    ...e,
    context: (e.context_paragraph || e.context_source) && {
      paragraph: e.context_paragraph,
      source: e.context_source,
    },
    search_result: JSON.parse(e.search_result),
  });
}

@injectable()
export class HistoryRepoImpl implements HistoryRepo {
  private log = logger.getLogger(HistoryRepoImpl.name);

  list(query: HistoryQuery): Promise<ISearchHistory[]> {
    const { user_id, text_in } = query;
    const text = text_in.map(e => `'${e}'`).join(',');
    return new Promise(((resolve, reject) => {
      database.transaction(tx => {
        tx.executeSql(
          // somehow this doesn't work
          // 'select * from histories where user_id = ? and text in (?)',
          // [user_id, text],
          `select * from histories where user_id = ? and text in (${text})`,
          [user_id],
          (tx, res) => {
            const items = Array.from({ length: res.rows.length }).map((e, i) => {
              return res.rows.item(i);
            }).map(row2obj);
            resolve(items);
          });
      }, (error) => {
        this.log.error(error);
        reject(error);
      });
    }));
  }

  findById(id: string): Promise<ISearchHistory | null | undefined> {
    return new Promise(((resolve, reject) => {
      database.transaction(tx => {
        tx.executeSql(
          'select * from histories where id = ?',
          [id],
          (tx, res) => {
            const items = Array.from({ length: res.rows.length }).map((e, i) => {
              return res.rows.item(i);
            })
              .map(row2obj);
            resolve(items.length ? items[0] : null);
          });
      }, (error) => {
        this.log.error(error);
        reject(error);
      });
    }));
  }

  async getById(id: string): Promise<ISearchHistory> {
    const res = await this.findById(id);
    if (!res) throw Error('resource not found');
    return res;
  }

  findAll(text: string, user_id: string): Promise<ISearchHistory[]> {
    return new Promise(((resolve, reject) => {
      database.transaction(tx => {
        tx.executeSql(
          'select * from histories where text = ? and user_id = ?',
          [text, user_id],
          (tx, res) => {
            const items = Array.from({ length: res.rows.length }).map((e, i) => {
              return res.rows.item(i);
            }).map(row2obj);
            resolve(items);
          });
      }, (error) => {
        this.log.error(error);
        reject(error);
      });
    }));
  }

  async save(history: ISearchHistory): Promise<ISearchHistory> {
    // this.log.debug(this.save.name, history.id, history.user_id, history.text);

    return new Promise(((resolve, reject) => {
      database.transaction(tx => {
        tx.executeSql(
          historyInsertSql,
          [
            history.id,
            history.user_id,
            history.text,
            history.context?.paragraph,
            history.context?.source,
            history.create_at,
            history.update_at,
            JSON.stringify(history.search_result),
          ],
          (tx, res) => {
            resolve(history);
          });
      }, (error) => {
        this.log.error(error);
        reject(error);
      });
    }));
  }

  async update(history: ISearchHistory): Promise<ISearchHistory> {
    this.log.debug(this.update.name, history.id, history.user_id, history.text);

    await new Promise(((resolve, reject) => {
      database.transaction(tx => {
        tx.executeSql(
          historyUpdateSql,
          [
            history.user_id,
            history.text,
            history.context?.paragraph,
            history.context?.source,
            history.create_at,
            history.update_at,
            JSON.stringify(history.search_result),
            history.id,
          ],
          (tx, res) => {
            resolve();
          });
      }, (error) => {
        this.log.error(error);
        reject(error);
      });
    }));
    return this.getById(history.id);
  }

  fetchSourceSuggest(text: string, user_id: string): Promise<string[]> {
    // return Promise.resolve(["foo", "bar", "baz", "qux"]);
    this.log.getLogger(this.fetchSourceSuggest.name).log(text, user_id);
    return new Promise(((resolve, reject) => {
      database.transaction(tx => {
        tx.executeSql(
          `select distinct context_source from histories where user_id = ? and context_source like ? order by update_at desc`,
          [user_id, `${text}%`],
          (tx, res) => {
            const items = Array.from({ length: res.rows.length }).map((e, i) => {
              return res.rows.item(i);
            }).map(e => e["context_source"]).filter(e => !!e && e !== text);
            resolve(items);
          });
      }, (error) => {
        this.log.error(error);
        reject(error);
      });
    }));
  }

  searchByCreateAt(param: HistoryCreateAtSearchParam): Promise<ISearchHistory[]> {
    this.log.debug(this.searchByCreateAt.name);
    const lowerBound = param.createAtBetween.lowerBound;
    const upperBound = param.createAtBetween.upperBound ?? (new Date()).getTime();
    const includeLower = param.createAtBetween.includeLower ?? true;
    const includeUpper = param.createAtBetween.includeUpper ?? true;
    const gt_op = includeLower ? '>=' : '>';
    const lt_op = includeUpper ? '<=' : '<';

    return new Promise(((resolve, reject) => {
      database.transaction(tx => {
        tx.executeSql(
          // `select * from histories order by create_at desc`,
          // [],
          // `select * from histories where user_id = ? order by create_at desc`,
          // [param.user_id],
          `select * from histories where user_id = ? and create_at ${gt_op} ? and create_at ${lt_op} ? order by create_at desc`,
          [param.user_id, lowerBound, upperBound],
          (tx, res) => {
            const items = Array.from({ length: res.rows.length }).map((e, i) => {
              return res.rows.item(i);
            }).map(row2obj);
            resolve(items);
          });
      }, (error) => {
        this.log.error(error);
        reject(error);
      });
    }));
  }

  searchByUpdateAt(param: HistoryUpdateAtSearchParam): Promise<ISearchHistory[]> {
    const lowerBound = param.updateAtBetween.lowerBound;
    const upperBound = param.updateAtBetween.upperBound ?? (new Date()).getTime();
    const includeLower = param.updateAtBetween.includeLower ?? true;
    const includeUpper = param.updateAtBetween.includeUpper ?? true;
    const gt_op = includeLower ? '>=' : '>';
    const lt_op = includeUpper ? '<=' : '<';

    return new Promise(((resolve, reject) => {
      database.transaction(tx => {
        tx.executeSql(
          `select * from histories where user_id = ? and update_at ${gt_op} ? and update_at ${lt_op} ?`,
          [lowerBound, upperBound],
          (tx, res) => {
            const items = Array.from({ length: res.rows.length }).map((e, i) => {
              return res.rows.item(i);
            }).map(row2obj);
            resolve(items);
          });
      }, (error) => {
        this.log.error(error);
        reject(error);
      });
    }));
  }

  clearAll(): Promise<void> {
    return new Promise(((resolve, reject) => {
      database.transaction(tx => {
        tx.executeSql(
          'delete from histories;',
          [],
          (tx, res) => {
            this.log.debug('truncate success');
            resolve();
          });
      }, (error) => {
        this.log.error(error);
        reject(error);
      });
    }));
  }

}
