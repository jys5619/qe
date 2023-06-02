export interface ErrorResult {
  success?: boolean;
  target?: string;
  msg?: string;
}

export interface IObject {
  id: number;
}

export interface IAuth {
  user?: IUser;
  errorResult?: ErrorResult;
}

export interface ILoginData {
  userId: string;
  pwd: string;
}

export interface IUser extends IObject {
  userId: string;
  pwd: string;
  email: string;
  names: string;
  enames: string;
  emno?: string;
  auth: string;
}

export interface IMenu extends IObject {
  menuId: string;
  pmenuId: string;
  menuName: string;
  menuPath?: string;
  icon?: string;
  separatorYn?: string;
  auth: string;
  sortNo?: number;
  useYn?: string;
}

export interface ICodeGroup {
  id: number;
  codeGroup: string;
  codeGroupName: string;
  description?: string;
  memoryYn: string;
  sortNo?: number;
  useYn?: string;
}

export interface ICode {
  id: number;
  codeGroup: string;
  code: string;
  codeName: string;
  description?: string;
  sortNo?: number;
  useYn?: string;
}
