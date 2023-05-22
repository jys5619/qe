import { ipcMain as im } from 'electron';
import userDao from './dao/user.dao';
import menuDao from './dao/menu.dao';

// User
im.handle('selectUserList', userDao.selectUserList);
im.handle('saveUser', userDao.saveUser);

// Menu
im.handle('selectMenuList', menuDao.selectMenuList);
im.handle('selectMyMenuList', menuDao.selectMyMenuList);
im.handle('saveMenu', menuDao.saveMenu);
