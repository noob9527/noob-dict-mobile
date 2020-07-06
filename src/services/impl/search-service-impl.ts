import { getSuggests, search, SearchOption, SearchResult, Suggest } from '@noob9527/noob-dict-core';
import { injectable } from 'inversify';
import { SearchService } from '../search-service';
import { rendererContainer } from './renderer-container';
import { NoteService, NoteServiceToken } from '../db/note-service';

// this implementation only works if you can circumvent the CORS problem
@injectable()
export class CorsSearchService implements SearchService {
  private noteService: NoteService;

  constructor() {
    this.noteService = rendererContainer.get<NoteService>(NoteServiceToken);
  }

  async fetchSuggests(text: string, user_id: string): Promise<Suggest[]> {
    if (text) {
      return getSuggests(text);
    } else {
      // if text is empty string, we fetch from notes
      const notes = await this.noteService.fetchLatest(20, user_id);
      return notes.map(e => {
        const firstMeaning = e.search_result?.definitions[0]?.meanings[0];
        return {
          entry: e.text,
          explain: firstMeaning?.ZH ?? firstMeaning?.EN,
        };
      });
    }
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

