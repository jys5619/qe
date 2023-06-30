import { IUserDto } from '../user/user.entity';
import { ErrorResult } from 'src/biz/common/common';

interface ILoginData {
  userId: string;
  pwd: string;
}

interface IAuth {
  user: IUserDto;
}

interface IAuthDto {
  user?: IUserDto;
  errorResult?: ErrorResult;
}

export { ILoginData, IAuth, IAuthDto };
