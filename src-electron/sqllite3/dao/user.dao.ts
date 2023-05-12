import { IpcMainInvokeEvent } from 'electron';
import { IUser } from 'src/entity/entity';
import sqlliteDb from './common';

const selectUserList = (event: IpcMainInvokeEvent, searchKeyword?: string): Promise<IUser[]> => {
  let users: Promise<IUser[]>;

  if ( !!searchKeyword ) {
    users = sqlliteDb.selectList<IUser, {$keyword: string}>('user/select-user-list-keyword', {$keyword: searchKeyword});
  } else {
    users = sqlliteDb.all<IUser>('user/select-user-list-all');
  }

  return users;
};

const userDao = {
  selectUserList,
}

export default userDao;
