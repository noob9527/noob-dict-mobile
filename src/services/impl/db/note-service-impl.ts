import { injectable } from 'inversify';
import { v4 as uuidv4 } from 'uuid';
import { HistoryService, HistoryServiceToken } from '../../db/history-service';
import { NoteService, NoteUpdateAtSearchParam } from '../../db/note-service';
import logger from '../../../utils/logger';
import { rendererContainer } from '../renderer-container';
import { INote, Note } from '../../../model/note';
import { ISearchHistory } from '../../../model/history';
import { HistoryRepo, HistoryRepoToken } from '../../db/history-repo';
import { NoteRepo, NoteRepoToken } from '../../db/note-repo';
import _ from 'lodash';

@injectable()
export class NoteServiceImpl implements NoteService {
  private log = logger.getLogger(NoteServiceImpl.name);

  private historyRepo: HistoryRepo;
  private historyService: HistoryService;
  private repo: NoteRepo;

  constructor() {
    this.repo = rendererContainer.get<NoteRepo>(NoteRepoToken);
    this.historyRepo = rendererContainer.get<HistoryRepo>(HistoryRepoToken);
    this.historyService = rendererContainer.get<HistoryService>(HistoryServiceToken);
  }

  /**
   * sync history with server
   * called after sync2server request success
   *
   * create or update a history(without changing its update_at property)
   * @param history
   */
  async syncHistory(history: ISearchHistory): Promise<void> {
    // this.log.debug(this.syncHistory.name, history);

    const existed = await this.historyService.findById(history.id);
    if (existed) {
      this.log.debug(this.syncHistory.name, 'update history');
      // we do not call this.historyService.update as we don't want to change history.update_at
      await this.historyRepo.update(history);
    } else {
      await this.addHistory(history);
    }
  }

  async addHistory(history: ISearchHistory): Promise<INote> {
    this.log.debug(this.addHistory.name, history.user_id, history.text);

    await this.historyService.save(history);
    let note = await this.fetch(history.text, history.user_id);
    if (!note) {
      note = Note.create({
        user_id: history.user_id,
        search_result: history.search_result,
        text: history.text,
      });
      await this.save(note);
    } else {
      await this.update(note);
    }
    note.histories.push(history);
    return note;
  }

  async save(note: INote): Promise<INote> {
    // this.log.debug(this.save.name, note.id, note.user_id, note.text);
    const now = new Date().valueOf();
    note.id = uuidv4();
    note.create_at = now;
    note.update_at = now;

    return this.repo.save(note);
  }

  async update(note: INote): Promise<INote> {
    this.log.debug(this.update.name, 'before');
    note.update_times++;
    note.update_at = (new Date()).valueOf();
    await this.repo.update(note);
    this.log.debug(this.update.name, 'after');
    return note;
  }

  getById(id: string): Promise<INote> {
    return this.repo.getById(id);
  }

  async fetch(text: string, user_id: string): Promise<INote | null | undefined> {
    logger.debug(this.fetch.name, text, user_id);
    const res = await this.repo.fetch(text, user_id);
    if (!res) return res;
    // for now, this is necessary to display context in search-note component
    res.histories = await this.historyService.findAll(text, user_id);
    return Note.wrap(res);
  }

  async fetchLatest(limit: number, user_id: string): Promise<INote[]> {
    return this.repo.fetchLatest(limit, user_id);
  }

  async searchByUpdateAt(param: NoteUpdateAtSearchParam): Promise<INote[]> {
    return this.repo.searchByUpdateAt(param);
  }

  async join_histories(notes: Note[]): Promise<INote[]> {
    if (!notes.length) return notes;
    const user_id = notes[0].user_id;
    const text_in = notes.map(e => e.text);

    const histories = await this.historyService.list({ user_id, text_in });
    const map = _.groupBy(histories, e => e.text);
    notes.forEach(note => {
      note.histories = map[note.text];
    });
    return notes;
  }

}
