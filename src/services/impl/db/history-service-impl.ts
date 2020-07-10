import { injectable } from 'inversify';
import { v4 as uuidv4 } from 'uuid';
import logger from '../../../utils/logger';
import {
  HistoryCreateAtSearchParam,
  HistoryService,
  HistoryServiceToken,
  HistoryUpdateAtSearchParam,
  HistoryQuery,
} from '../../db/history-service';
import { ISearchHistory } from '../../../model/history';
import { HistoryRepoImpl } from './history-repo-impl';
import { rendererContainer } from '../renderer-container';
import { HistoryRepo, HistoryRepoToken } from '../../db/history-repo';


@injectable()
export class HistoryServiceImpl implements HistoryService {
  private log = logger.getLogger(HistoryServiceImpl.name);
  private repo: HistoryRepo;

  constructor() {
    this.repo = rendererContainer.get<HistoryRepo>(HistoryRepoToken);
  }

  list(query: HistoryQuery): Promise<ISearchHistory[]> {
    return this.repo.list(query);
  }

  findById(id: string): Promise<ISearchHistory> {
    return this.repo.findById(id);
  }

  getById(id: string): Promise<ISearchHistory> {
    return this.repo.getById(id);
  }

  findAll(text: string, user_id: string): Promise<ISearchHistory[]> {
    return this.repo.findAll(text, user_id);
  }

  async save(history: ISearchHistory): Promise<ISearchHistory> {
    // this.log.debug(this.save.name, history);

    const now = new Date().valueOf();
    history.create_at = history.create_at ?? now;
    history.update_at = history.update_at ?? now;
    history.id = history.id ?? uuidv4();

    return this.repo.save(history);
  }

  async update(history: ISearchHistory): Promise<ISearchHistory> {
    history.update_at = new Date().valueOf();
    return this.repo.update(history);
  }

  fetchSourceSuggest(text: string, user_id: string): Promise<string[]> {
    return this.repo.fetchSourceSuggest(text, user_id);
  }

  searchByCreateAt(param: HistoryCreateAtSearchParam): Promise<ISearchHistory[]> {
    this.log.debug(this.searchByCreateAt.name, param);
    return this.repo.searchByCreateAt(param);
  }

  searchByUpdateAt(param: HistoryUpdateAtSearchParam): Promise<ISearchHistory[]> {
    return this.repo.searchByUpdateAt(param);
  }


}
