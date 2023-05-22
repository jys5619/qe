import { IMenuDto } from './biz/menu';
import { IUserDto } from './biz/user';

export {};

declare global {
  interface Window {
    api: {
      saveTextFile(text: string): Promise<string>;
      loadTextFile(): Promise<string>;
      // User
      selectUserList(searchKeyword: string): Promise<IUserDto[]>;
      saveUser(userDto: IUserDto): Promise<number>;
      // Menu
      selectMenuList(pmenuId: string): Promise<IMenuDto[]>;
      selectMyMenuList(userId: string): Promise<IMenuDto[]>;
      saveMenu(menuDto: IMenuDto): Promise<number>;
    };
  }
}
