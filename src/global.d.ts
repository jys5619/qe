import { IMenu, IUser } from './entity/entity';

export {};

declare global {
  interface Window {
    api: {
      saveTextFile(text: string): Promise<string>;
      loadTextFile(): Promise<string>;
      testConnect(): Promise<string>;
      selectUserList(searchKeyword: string): Promise<IUser[]>
      selectMenuList(): Promise<IMenu[]>;
    };
  }
}
