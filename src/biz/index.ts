import { ICodeGroup, ICode, ICodeGroupDto, ICodeDto } from './code/code.entity';
import { codeService } from './code/code.service';
import { codeEndpoint } from './code/code.endpoint';
import { IMenu, IMenuDto } from './menu/menu.entity';
import { menuService } from './menu/menu.service';
import { menuEndpoint } from './menu/menu.endpoint';
import {
  ITemplate,
  ITemplateDto,
  TemplateType,
} from './template/template.entity';
import { templateService } from './template/template.service';
import { templateEndpoint } from './template/template.endpoint';
import { IUser, IUserDto, IUserPwdDto } from './user/user.entity';
import { userService } from './user/user.service';
import { userEndpoint } from './user/user.endpoint';
import { IAuth, IAuthDto, ILoginData } from './auth/auth.entity';
import { authService } from './auth/auth.service';
import { authEndpoint } from './auth/auth.endpoint';

export type {
  ICodeGroup,
  ICode,
  ICodeGroupDto,
  ICodeDto,
  IMenu,
  IMenuDto,
  ITemplate,
  ITemplateDto,
  IUser,
  IUserDto,
  IUserPwdDto,
  ILoginData,
  IAuth,
  IAuthDto,
  TemplateType,
};

export {
  codeService,
  codeEndpoint,
  menuService,
  menuEndpoint,
  templateService,
  templateEndpoint,
  userService,
  userEndpoint,
  authService,
  authEndpoint,
};
