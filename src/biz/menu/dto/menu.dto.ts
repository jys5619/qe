export interface IMenuDto {
  id: number;
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
