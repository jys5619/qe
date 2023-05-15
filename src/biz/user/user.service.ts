import { ValidateResult } from '../common/common';
import { IUserDto } from './dto/user.dto';
import { IUser } from './user.entity';

const isIUser = (obj: any): obj is IUser => {
  return (
    'id' in obj &&
    'userId' in obj &&
    'email' in obj &&
    'names' in obj &&
    'auth' in obj
  );
};

const getIUserInitValue = (): IUser => {
  return {
    id: -1,
    userId: '',
    pwd: '',
    email: '',
    names: '',
    enames: '',
    emno: '',
    auth: [],
    useYn: '',
  } as IUser;
};

const convertIUser = (userDto: IUserDto): IUser => {
  const user: IUser = {
    id: userDto.id,
    userId: userDto.userId,
    email: userDto.email,
    names: userDto.names,
    enames: userDto.enames,
    emno: userDto.emno,
    auth: userDto.auth.split(','),
    useYn: userDto.useYn,
  };

  return user;
};

const validate = (user: Partial<IUser>): ValidateResult => {
  const result = new ValidateResult();

  if (!user.userId) {
    result.setMsg('userId', 'userId empty.');
  }

  if (!user.email) {
    result.setMsg('email', 'email empty.');
  }

  if (!user.names) {
    result.setMsg('names', 'names empty.');
  }

  if (!user.enames) {
    result.setMsg('enames', 'enames empty.');
  }

  if (!user.auth || user.auth.length <= 0) {
    result.setMsg('auth', 'auth empty.');
  }

  return result;
};

const convertIUserDto = (user: Partial<IUser>): IUserDto => {
  const userDto: IUserDto = {
    id: user.id || -1,
    userId: user.userId || '',
    email: user.email || '',
    names: user.names || '',
    enames: user.enames || '',
    emno: user.emno,
    auth: user.auth?.join(',') || '',
    useYn: user.useYn || '',
  };

  return userDto;
};
const userService = {
  isIUser,
  getIUserInitValue,
  convertIUser,
  convertIUserDto,
  validate,
};

export { userService };
