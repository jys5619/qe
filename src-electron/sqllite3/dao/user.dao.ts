import { IpcMainInvokeEvent } from 'electron';
import sqlliteDb from './common';
import { IUser } from 'app/src-electron/entity/qe.entity';

const selectUserList = (
  event: IpcMainInvokeEvent,
  searchKeyword?: string
): Promise<IUser[]> => {
  let users: Promise<IUser[]>;

  if (!!searchKeyword) {
    users = sqlliteDb.selectList<IUser, { $keyword: string }>(
      'user/select-user-list-keyword',
      { $keyword: searchKeyword }
    );
  } else {
    users = sqlliteDb.all<IUser>('user/select-user-list-all');
  }

  return users;
};

const saveUser = (event: IpcMainInvokeEvent, user: IUser): Promise<number> => {
  let users: Promise<number>;

  if (!!user.id && user.id > 0) {
    users = sqlliteDb.exec('user/update-user', user);
  } else {
    users = sqlliteDb.exec('user/insert-user', user);
  }

  return users;
};

const userDao = {
  selectUserList,
  saveUser,
};

export default userDao;
