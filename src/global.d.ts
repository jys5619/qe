import { IMenuDto } from './biz/menu/dto/menu.dto';
import { IUserDto } from './biz/user/dto/user.dto';

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
      selectMenuList(): Promise<IMenuDto[]>;
    };
  }
}
