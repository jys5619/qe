export interface IUser {
  id: number;
  userId: string;
  pwd: string;
  email: string;
  names: string;
  enames: string;
  emno?: string;
  auth: string;
  authList: string[];
}

export const isIUser = (obj: any): obj is IUser => {
  return 'id' in obj && 'userId' in obj && 'email' in obj && 'names' in obj;
};

export const getIUserInitValue = (): IUser => {
  return {
    id: -1,
    userId: '',
    pwd: '',
    email: '',
    names: '',
    enames: '',
    emno: '',
    auth: '',
    authList: [],
  } as IUser;
};

export interface IMenu {
  id: number;
  menuId: string;
  label: string;
  url: string;
  authGroup: string;
  menuType: string;
  pMenuId?: string;
  icon?: string;
  iconColor?: string;
  separator?: boolean;
  ord?: number;
}
