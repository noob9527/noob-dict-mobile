import { injectable } from 'inversify';
import { LocalStorageService } from '../LocalStorageService';
import AsyncStorage from '@react-native-community/async-storage';


// this implementation only works if you can circumvent the CORS problem
@injectable()
export class LocalStorageServiceImpl implements LocalStorageService {
  async getObject(key: string): Promise<any | null | undefined> {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  putObject(key: string, value: any) {
    return AsyncStorage.setItem(key, JSON.stringify(value));
  }

  remove(key: string) {
    return AsyncStorage.removeItem(key);
  }
}
