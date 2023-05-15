import { IMenuDto } from './biz/menu/dto/menu.dto';
import { IUserDto } from './biz/user/dto/user.dto';

export {};

declare global {
  interface Window {
    api: {
      saveTextFile(text: string): Promise<string>;
      loadTextFile(): Promise<string>;
      testConnect(): Promise<string>;
      selectUserList(searchKeyword: string): Promise<IUserDto[]>;
      saveUser(userDto: IUserDto): Promise<number>;
      selectMenuList(): Promise<IMenuDto[]>;
    };
  }
}
