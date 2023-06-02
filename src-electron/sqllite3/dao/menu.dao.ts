import { IpcMainInvokeEvent } from 'electron';
import sqlliteDb from './common';
import { IMenu } from 'app/src-electron/entity/qe.entity';

const selectMenuList = (
  event: IpcMainInvokeEvent,
  pmenuId?: string
): Promise<IMenu[]> => {
  let menus: Promise<IMenu[]>;

  if (!!pmenuId) {
    menus = sqlliteDb.selectList<IMenu, { $keyword: string }>(
      'menu/select-menu-list-pmenuid',
      { $keyword: pmenuId }
    );
  } else {
    menus = sqlliteDb.all<IMenu>('menu/select-menu-list-all');
  }

  return menus;
};

const selectMyMenuList = (
  event: IpcMainInvokeEvent,
  userId: string
): Promise<IMenu[]> => {
  const menus = sqlliteDb.selectList<IMenu, { $keyword: string }>(
    'menu/select-menu-list-userid',
    { $keyword: userId }
  );

  return menus;
};

const saveMenu = (event: IpcMainInvokeEvent, menu: IMenu): Promise<number> => {
  let menus: Promise<number>;

  if (!!menu.id && menu.id > 0) {
    menus = sqlliteDb.exec('menu/update-menu', menu);
  } else {
    menus = sqlliteDb.exec('menu/insert-menu', menu);
  }

  return menus;
};

const menuDao = {
  selectMenuList,
  selectMyMenuList,
  saveMenu,
};

export default menuDao;
