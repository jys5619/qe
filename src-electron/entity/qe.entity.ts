export interface IObject {
  id: number;
}

export interface IUser extends IObject {
  userId: string;
  pwd: string;
  email: string;
  names: string;
  enames: string;
  emno: string;
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
