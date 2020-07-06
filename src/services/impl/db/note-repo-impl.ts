import database from './database';
import logger from '../../../utils/logger';
import { INote, Note } from '../../../model/note';
import { NoteRepo } from '../../db/note-repo';
import { injectable } from 'inversify';

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
            })
              .map(e => ({
                ...e,
                search_result: JSON.parse(e.search_result),
              }))
              .map(e => Note.wrap(e));
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
            })
              .map(e => ({
                ...e,
                search_result: JSON.parse(e.search_result),
              }))
              .map(e => Note.wrap(e));
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
            })
              .map(e => ({
                ...e,
                search_result: JSON.parse(e.search_result),
              }))
              .map(e => Note.wrap(e));
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
