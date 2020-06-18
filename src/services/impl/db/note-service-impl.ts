import database from './database';
import { injectable } from 'inversify';
import { v4 as uuidv4 } from 'uuid';
import { HistoryService, HistoryServiceToken } from '../../db/history-service';
import { NoteService } from '../../db/note-service';
import logger from '../../../utils/logger';
import { rendererContainer } from '../renderer-container';
import { INote, Note } from '../../../model/note';
import { ISearchHistory } from '../../../model/history';

@injectable()
export class NoteServiceImpl implements NoteService {
  private historyService: HistoryService;
  private log = logger.getLogger(NoteServiceImpl.name);

  constructor() {
    this.historyService = rendererContainer.get<HistoryService>(HistoryServiceToken);
  }

  addHistory(history: ISearchHistory): Promise<INote> {
    return Promise.resolve(undefined);
  }

  fetch(text: string, user_id: string): Promise<INote | null | undefined> {
    return Promise.resolve(undefined);
  }

  fetchLatest(limit: number, user_id: string): Promise<INote[]> {
    return Promise.resolve([]);
  }

  syncHistory(history: ISearchHistory): Promise<void> {
    return Promise.resolve(undefined);
  }


}
