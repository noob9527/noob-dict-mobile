import database from './database';
import logger from '../../../utils/logger';
import { INote, Note } from '../../../model/note';
import { NoteRepo } from '../../db/note-repo';
import { injectable } from 'inversify';
import { NoteUpdateAtSearchParam } from '../../db/note-service';

const noteInsertSql = `
insert into notes 
  (
    id,
    user_id,
    text,
    remark,
    create_at,
    update_at,
    update_times,
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

const noteUpdateSql = `
update notes 
set 
  user_id = ?,
  text = ?,
  remark = ?,
  create_at = ?,
  update_at = ?,
  update_times = ?,
  search_result = ?
where id = ?
`;

function row2obj(e: any) {
  return Note.wrap({
    ...e,
    search_result: JSON.parse(e.search_result),
  });
}

@injectable()
export class NoteRepoImpl implements NoteRepo {
  private log = logger.getLogger(NoteRepoImpl.name);

  async save(note: INote): Promise<INote> {
    this.log.debug(this.save.name, note);

    return new Promise(((resolve, reject) => {
      database.transaction(tx => {
        tx.executeSql(
          noteInsertSql,
          [
            note.id,
            note.user_id,
            note.text,
            note.remark,
            note.create_at,
            note.update_at,
            note.update_times,
            JSON.stringify(note.search_result),
          ],
          (tx, res) => {
            resolve(note);
          });
      }, (error) => {
        this.log.error(error);
        reject(error);
      });
    }));
  }

  async update(note: INote): Promise<INote> {
    return new Promise(((resolve, reject) => {
      database.transaction(tx => {
        tx.executeSql(
          noteUpdateSql,
          [
            note.user_id,
            note.text,
            note.remark,
            note.create_at,
            note.update_at,
            note.update_times,
            JSON.stringify(note.search_result),
            note.id,
          ],
          (tx, res) => {
            resolve(note);
          });
      }, (error) => {
        this.log.error(error);
        reject(error);
      });
    }));
  }

  getById(id: string): Promise<INote> {
    return new Promise(((resolve, reject) => {
      database.transaction(tx => {
        tx.executeSql(
          'select * from notes where id = ?',
          [id],
          (tx, res) => {
            const items = Array.from({ length: res.rows.length }).map((e, i) => {
              return res.rows.item(i);
            }).map(row2obj);
            resolve(items[0]);
          });
      }, (error) => {
        this.log.error(error);
        reject(error);
      });
    }));
  }

  fetch(text: string, user_id: string): Promise<INote | null | undefined> {
    return new Promise(((resolve, reject) => {
      database.transaction(tx => {
        tx.executeSql(
          'select * from notes where text = ? and user_id = ?',
          [text, user_id],
          (tx, res) => {
            const items = Array.from({ length: res.rows.length }).map((e, i) => {
              return res.rows.item(i);
            }).map(row2obj);
            resolve(items[0]);
          });
      }, (error) => {
        this.log.error(error);
        reject(error);
      });
    }));
  }

  fetchLatest(limit: number, user_id: string): Promise<INote[]> {
    return new Promise(((resolve, reject) => {
      database.transaction(tx => {
        tx.executeSql(
          'select * from notes where user_id = ? order by update_at desc limit ?',
          [user_id, limit],
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

  searchByUpdateAt(param: NoteUpdateAtSearchParam): Promise<INote[]> {
    const { user_id } = param;
    const lowerBound = param.updateAtBetween.lowerBound;
    const upperBound = param.updateAtBetween.upperBound ?? (new Date()).getTime();
    const includeLower = param.updateAtBetween.includeLower ?? true;
    const includeUpper = param.updateAtBetween.includeUpper ?? true;
    const gt_op = includeLower ? '>=' : '>';
    const lt_op = includeUpper ? '<=' : '<';

    return new Promise(((resolve, reject) => {
      database.transaction(tx => {
        tx.executeSql(
          `select * from notes where user_id = ? and update_at ${gt_op} ? and update_at ${lt_op} ? order by update_at desc`,
          [user_id, lowerBound, upperBound],
          // `select * from notes order by update_at desc`,
          // [],
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
          'delete from notes;',
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
