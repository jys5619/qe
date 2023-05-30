import { ipcMain as im } from 'electron';
import { authDao, menuDao, userDao } from './dao';


// Auth
im.handle('login', authDao.login);

// User
im.handle('selectUserList', userDao.selectUserList);
im.handle('saveUser', userDao.saveUser);

// Menu
im.handle('selectMenuList', menuDao.selectMenuList);
im.handle('selectMyMenuList', menuDao.selectMyMenuList);
im.handle('saveMenu', menuDao.saveMenu);
