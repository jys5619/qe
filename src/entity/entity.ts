export interface IUser {
  id: number;
  userId: string;
  pwd: string;
  email: string;
  name: string;
  ename: string;
  emno: string;
  auth?: string;
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
  separator?: boolean;
  ord?: number;
}
