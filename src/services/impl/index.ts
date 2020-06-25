import { CorsSearchService, MockSearchService } from './search-service-impl';
import { LocalStorageServiceImpl } from './local-storage-service-impl';
import { rendererContainer } from './renderer-container';
import { SearchService, SearchServiceToken } from '../search-service';
import { UserService, UserServiceToken } from '../user-service';
import { CorsUserService } from './user-service-impl';
import { LocalStorageService, LocalStorageServiceToken } from '../LocalStorageService';
import { HistoryService, HistoryServiceToken } from '../db/history-service';
import { HistoryServiceImpl } from './db/history-service-impl';
import { NoteService, NoteServiceToken } from '../db/note-service';
import { NoteServiceImpl } from './db/note-service-impl';

function registerAllService() {
  // rendererContainer.bind<SearchService>(SearchServiceToken).to(CorsSearchService);
  rendererContainer.bind<SearchService>(SearchServiceToken).to(MockSearchService);
  rendererContainer.bind<UserService>(UserServiceToken).to(CorsUserService);
  rendererContainer.bind<LocalStorageService>(LocalStorageServiceToken).to(LocalStorageServiceImpl);

  // db
  rendererContainer.bind<HistoryService>(HistoryServiceToken).to(HistoryServiceImpl);
  rendererContainer.bind<NoteService>(NoteServiceToken).to(NoteServiceImpl);
}

registerAllService();
