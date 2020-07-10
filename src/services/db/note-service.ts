import { INote, Note } from '../../model/note';
import { ISearchHistory } from '../../model/history';

export const NoteServiceToken = Symbol.for('note-service');

interface NoteSearchParam {
  user_id: string
}

export interface NoteUpdateAtSearchParam extends NoteSearchParam {
  updateAtBetween: {
    lowerBound: number,
    upperBound?: number,
    includeLower?: boolean,
    includeUpper?: boolean,
  }
}

export interface NoteService {
  // cascade fetch corresponding histories
  fetch(text: string, user_id: string): Promise<INote | null | undefined>

  fetchLatest(limit: number, user_id: string): Promise<INote[]>

  // if the note is not present
  // create one based on the history
  addHistory(history: ISearchHistory): Promise<INote>

  // if history is new, call addHistory
  // else just update history
  syncHistory(history: ISearchHistory): Promise<void>

  // addHistories(histories: ISearchHistory[]): Promise<ISearchHistory[]>

  searchByUpdateAt(param: NoteUpdateAtSearchParam): Promise<INote[]>

  join_histories(notes: Note[]): Promise<INote[]>

}
