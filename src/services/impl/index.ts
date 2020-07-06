import { CorsSearchService, MockSearchService } from './search-service-impl';
import { LocalStorageServiceImpl } from './local-storage-service-impl';
import { rendererContainer } from './renderer-container';
import { SearchService, SearchServiceToken } from '../search-service';
import { UserService, UserServiceToken } from '../user-service';
import { CorsUserService } from './user-service-impl';
import { LocalStorageService, LocalStorageServiceToken } from '../local-storage-service';
import { HistoryService, HistoryServiceToken } from '../db/history-service';
import { HistoryServiceImpl } from './db/history-service-impl';
import { NoteService, NoteServiceToken } from '../db/note-service';
import { NoteServiceImpl } from './db/note-service-impl';
import { GlobalHistoryService, GlobalHistoryServiceToken } from '../global-history-service';
import { GlobalHistoryServiceImpl } from './global-history-service-impl';
import { HistoryRepo, HistoryRepoToken } from '../db/history-repo';
import { NoteRepo, NoteRepoToken } from '../db/note-repo';
import { HistoryRepoImpl } from './db/history-repo-impl';
import { NoteRepoImpl } from './db/note-repo-impl';

let binded = false;

function registerAllService() {
  rendererContainer.bind<SearchService>(SearchServiceToken).to(CorsSearchService);
  // rendererContainer.bind<SearchService>(SearchServiceToken).to(MockSearchService);
  rendererContainer.bind<UserService>(UserServiceToken).to(CorsUserService);
  rendererContainer.bind<LocalStorageService>(LocalStorageServiceToken).to(LocalStorageServiceImpl);
  rendererContainer.bind<GlobalHistoryService>(GlobalHistoryServiceToken).to(GlobalHistoryServiceImpl);

  // db
  rendererContainer.bind<HistoryRepo>(HistoryRepoToken).to(HistoryRepoImpl);
  rendererContainer.bind<NoteRepo>(NoteRepoToken).to(NoteRepoImpl);
  rendererContainer.bind<HistoryService>(HistoryServiceToken).to(HistoryServiceImpl);
  rendererContainer.bind<NoteService>(NoteServiceToken).to(NoteServiceImpl);
}

// registerAllService();

// @ts-ignore
if (!binded) {
  registerAllService();
  binded = true;
}
