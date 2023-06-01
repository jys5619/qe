import { ILoginData } from './biz/auth/auth.entity';
import { IAuthDto } from './biz/auth/dto/auth.dto';
import { ICode, ICodeDto, ICodeGroup, ICodeGroupDto } from './biz/code';
import { IMenuDto } from './biz/menu';
import { IUserDto } from './biz/user';

export {};

declare global {
  interface Window {
    api: {
      saveTextFile(text: string): Promise<string>;
      loadTextFile(): Promise<string>;
      // Auth
      login(loginData: ILoginData): Promise<IAuthDto>;
      // User
      selectUserList(searchKeyword: string): Promise<IUserDto[]>;
      saveUser(userDto: IUserDto): Promise<number>;
      // Menu
      selectMenuList(pmenuId: string): Promise<IMenuDto[]>;
      selectMyMenuList(userId: string): Promise<IMenuDto[]>;
      saveMenu(menuDto: IMenuDto): Promise<number>;
      // Code
      selectCodeGroupList(): Promise<ICodeGroup[]>;
      selectCodeList(codeGroup: string): Promise<ICode[]>;
      saveCodeGroup(codeGroup: ICodeGroupDto): Promise<number>;
      saveCode(code: ICodeDto): Promise<number>;
    };
  }
}
