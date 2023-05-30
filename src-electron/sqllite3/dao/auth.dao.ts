import { IpcMainInvokeEvent } from 'electron';
import sqlliteDb from './common';
import { IAuth, ILoginData, IUser } from 'app/src-electron/entity/qe.entity';

const login = async (
  event: IpcMainInvokeEvent,
  loginData: ILoginData
): Promise<IAuth> => {
  const auth = {} as IAuth;

  if (!loginData) {
    auth.errorResult = {success: false, msg: 'login fail'};
    return Promise.resolve(auth);
  }

  const user = await sqlliteDb.select<IUser, { $keyword: string }>(
    'auth/select-user-userid',
    { $keyword: loginData.userId }
  );

  if ( user.pwd !== loginData.pwd) {
    auth.errorResult = {success: false, msg: 'login fail'};
    return Promise.resolve(auth);
  }

  auth.user = user;
  return Promise.resolve(auth);
};

const authDao = {
  login,
};

export default authDao;
