import { injectable } from 'inversify';
import axios from 'axios';
import { LocalStorageService, LocalStorageServiceToken } from '../local-storage-service';
import { UserService } from '../user-service';
import { rendererContainer } from './renderer-container';
import { LoginOption } from '../../config/social-login';
import { User } from '../../model/user';
import logger from '../../utils/logger';

const USER_KEY = 'currentUser';

// this implementation only works if you can circumvent the CORS problem
@injectable()
export class CorsUserService implements UserService {

  private localStorageService: LocalStorageService;

  constructor() {
    this.localStorageService = rendererContainer.get<LocalStorageService>(LocalStorageServiceToken);
  }

  async login(code: string, option: LoginOption): Promise<User> {
    const res = await axios.post(option.tokenExchangeUrl, {
      code,
      redirect_uri: option.params.redirect_uri
    });
    const user = res.data;
    if (!user.id) {
      logger.error('option:', option);
      logger.error('res:', res);
      throw Error('login failed');
    }
    // we remove last_sync_time here, otherwise won't able to fetch latest update item
    // this may take a long while to finish
    user.last_sync_time = (new Date(0)).toISOString()
    await this.localStorageService.putObject(USER_KEY, user);
    return user;
  }

  async fetchCurrentUserFromStorage(): Promise<User | null | undefined> {
    return this.localStorageService.getObject(USER_KEY);
  }

  async patchCurrentUser(patch: Partial<User>): Promise<User> {
    const user = await this.fetchCurrentUserFromStorage()!!;
    Object.assign(user, patch);
    await this.localStorageService.putObject(USER_KEY, user);
    return user;
  }

  logout() {
    return this.localStorageService.remove(USER_KEY)
  }

}
