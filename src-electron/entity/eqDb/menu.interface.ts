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
  ord?: number
}
