import { IUserDto } from '../user';

export interface ILoginData {
  userId: string;
  pwd: string;
}

export interface IAuth {
  user: IUserDto;
}
