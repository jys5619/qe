import { ValidateResult } from '../common/common';
import { IUser, IUserDto } from './user.entity';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    email: '',
    names: '',
    enames: '',
    auth: [],
    useYn: '',
  } as IUser;
};

const convertIUser = (userDto?: IUserDto): IUser => {
  const user = getIUserInitValue();

  if (userDto) {
    user.id = userDto.id;
    user.userId = userDto.userId;
    user.email = userDto.email;
    user.names = userDto.names;
    user.enames = userDto.enames;
    user.auth = userDto.auth?.split(',') || '';
    user.useYn = userDto.useYn;
  }

  return user;
};

/**
 * IUser => IUserDto
 * @param user
 * @returns
 */
const convertIUserDto = (user: Partial<IUser>): IUserDto => {
  const userDto: IUserDto = {
    id: user.id || -1,
    userId: user.userId || '',
    email: user.email || '',
    names: user.names || '',
    enames: user.enames || '',
    auth: user.auth?.join(',') || '',
    useYn: user.useYn || '',
  };

  return userDto;
};

/**
 * INSERT VALIDATION
 */
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

const userService = {
  isIUser,
  getIUserInitValue,
  convertIUser,
  convertIUserDto,
  validate,
};

export { userService };
