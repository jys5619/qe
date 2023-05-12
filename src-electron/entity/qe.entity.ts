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
  label: string;
  url: string;
  authGroup: string;
  menuType: string;
  pMenuId?: string;
  icon?: string;
  iconColor?: string;
  separator?: string;
  ord?: number;
}
