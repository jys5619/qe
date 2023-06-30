import { ValidateResult } from '../common/common';
import { IMenuDto } from './dto/menu.dto';
import { IMenu } from './menu.entity';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isIMenu = (obj: any): obj is IMenu => {
  return (
    'id' in obj &&
    'menuId' in obj &&
    'pmenuId' in obj &&
    'menuName' in obj &&
    'auth' in obj
  );
};

const getIMenuInitValue = (): IMenu => {
  return {
    id: -1,
    menuId: '',
    pmenuId: '',
    menuName: '',
    menuPath: '',
    icon: '',
    separatorYn: '',
    auth: [],
    sortNo: 0,
    useYn: '',
  } as IMenu;
};

const convertIMenu = (menuDto: IMenuDto): IMenu => {
  return {
    id: menuDto.id,
    menuId: menuDto.menuId,
    pmenuId: menuDto.pmenuId,
    menuName: menuDto.menuName,
    menuPath: menuDto.menuPath,
    icon: menuDto.icon,
    separatorYn: menuDto.separatorYn,
    auth: menuDto.auth?.split(',') || [],
    sortNo: menuDto.sortNo,
    useYn: menuDto.useYn,
  } as IMenu;
};

const convertIMenuDto = (menu: Partial<IMenu>): IMenuDto => {
  return {
    id: menu.id || '',
    menuId: menu.menuId || '',
    pmenuId: menu.pmenuId || '',
    menuName: menu.menuName || '',
    menuPath: menu.menuPath || '',
    icon: menu.icon || '',
    separatorYn: menu.separatorYn || '',
    auth: menu.auth?.join(',') || '',
    sortNo: menu.sortNo || '',
    useYn: menu.useYn || '',
  } as IMenuDto;
};

const validate = (menu: Partial<IMenu>): ValidateResult => {
  const result = new ValidateResult();

  if (!menu.menuId) {
    result.setMsg('menuId', 'Menu Id empty.');
  }

  if (!menu.pmenuId) {
    result.setMsg('email', 'Parent Menu Id empty.');
  }

  if (!menu.menuName) {
    result.setMsg('names', 'Menu Name empty.');
  }

  if (!menu.auth || menu.auth.length <= 0) {
    result.setMsg('auth', 'Auth empty.');
  }

  return result;
};

const menuService = {
  isIMenu,
  getIMenuInitValue,
  convertIMenu,
  convertIMenuDto,
  validate,
};

export { menuService };
