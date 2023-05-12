export interface IUser {
  id: number;
  userId: string;
  pwd: string;
  email: string;
  names: string;
  enames: string;
  emno: string;
  auth: string;
}

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
  separator?: string;
  ord?: number;
}
