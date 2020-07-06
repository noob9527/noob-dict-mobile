export const LocalStorageServiceToken = Symbol.for('local-storage-service');

export interface LocalStorageService {
  putObject(key: string, value: any): Promise<void>

  getObject(key: string): Promise<any | null | undefined>

  remove(key: string): Promise<void>
}
