import { ISearchHistory } from '../../model/history';
import { HistoryCreateAtSearchParam, HistoryQuery, HistoryUpdateAtSearchParam } from './history-service';

export const HistoryRepoToken = Symbol.for('history-repo');

export interface HistoryRepo {
  findById(id: string): Promise<ISearchHistory | null | undefined>;

  getById(id: string): Promise<ISearchHistory>;

  findAll(text: string, user_id: string): Promise<ISearchHistory[]>;

  save(history: ISearchHistory): Promise<ISearchHistory>;

  update(history: ISearchHistory): Promise<ISearchHistory>;

  fetchSourceSuggest(text: string, user_id: string): Promise<string[]>;

  searchByCreateAt(param: HistoryCreateAtSearchParam): Promise<ISearchHistory[]>;

  searchByUpdateAt(param: HistoryUpdateAtSearchParam): Promise<ISearchHistory[]>;

  list(query: HistoryQuery): Promise<ISearchHistory[]>

  clearAll(): Promise<void>;
}
