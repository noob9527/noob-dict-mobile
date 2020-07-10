import { INote } from '../../model/note';
import { NoteUpdateAtSearchParam } from './note-service';

export const NoteRepoToken = Symbol.for('note-repo');

export interface NoteRepo {
  save(note: INote): Promise<INote>;

  update(note: INote): Promise<INote>;

  getById(id: string): Promise<INote>;

  fetch(text: string, user_id: string): Promise<INote | null | undefined>;

  fetchLatest(limit: number, user_id: string): Promise<INote[]>;

  searchByUpdateAt(param: NoteUpdateAtSearchParam): Promise<INote[]>

  clearAll(): Promise<void>;
}
