import { ipcMain as im } from 'electron';
import { Database } from 'sqlite3';
import { IMenu } from '../entity/qe.entity';
import userDao from './dao/user.dao';

/**
 * SELECT MENU
 */
im.handle('selectMenuList', async () => {
  return new Promise((succ, fail) => {
    const db = new Database(__dirname + '/db/db.sqlite');
    try {
      db.all(
        'SELECT * FROM TB_MENU ORDER BY MENU_TYPE, P_MENU_ID, ORD',
        (err: Error, res: any[]) => {
          if (!!err) {
            fail(err);
          } else {
            const menuList = res.map((row) => {
              return row as IMenu;
            });
            succ(menuList);
          }
        }
      );
    } catch (error) {
      fail(error);
    } finally {
      db.close();
    }
  });
});

// User
im.handle('selectUserList', userDao.selectUserList);
im.handle('saveUser', userDao.saveUser);
