import { getSuggests, search, SearchOption, SearchResult, Suggest } from '@noob9527/noob-dict-core';
import { injectable } from 'inversify';
import { SearchService } from '../search-service';

// this implementation only works if you can circumvent the CORS problem
@injectable()
export class CorsSearchService implements SearchService {

  constructor() {
  }

  async fetchSuggests(text: string, user_id: string): Promise<Suggest[]> {
    return getSuggests(text);
  }

  async fetchResult(text: string, option: SearchOption): Promise<SearchResult> {
    return await search(text, option);
  }
}

@injectable()
export class MockSearchService implements SearchService {
  fetchSuggests(text: string): Promise<Suggest[]> {
    return getSuggests(text, { mock: true });
  }

  async fetchResult(text: string, option: SearchOption): Promise<SearchResult> {
    return await search(text, { mock: true });
  }
}

