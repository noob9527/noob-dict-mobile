import { CorsSearchService } from './search-service-impl';
import { LocalStorageServiceImpl } from './local-storage-service-impl';
import { rendererContainer } from './renderer-container';
import { SearchService, SearchServiceToken } from '../search-service';
import { UserService, UserServiceToken } from '../user-service';
import { CorsUserService } from './user-service-impl';
import { LocalStorageService, LocalStorageServiceToken } from '../LocalStorageService';

function registerAllService() {
  rendererContainer.bind<SearchService>(SearchServiceToken).to(CorsSearchService);
  rendererContainer.bind<UserService>(UserServiceToken).to(CorsUserService);
  rendererContainer.bind<LocalStorageService>(LocalStorageServiceToken).to(LocalStorageServiceImpl);

  // db
  // rendererContainer.bind<HistoryService>(HistoryServiceToken).to(DexieHistoryService);
  // rendererContainer.bind<NoteService>(NoteServiceToken).to(DexieNoteService);
}

registerAllService();
