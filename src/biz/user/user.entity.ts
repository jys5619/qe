interface IUser {
  id: number;
  userId: string;
  email: string;
  names: string;
  enames?: string;
  emno?: string;
  auth: string[];
  useYn: string;
}

interface IUserDto {
  id: number;
  userId: string;
  email: string;
  names: string;
  enames?: string;
  emno?: string;
  auth: string;
  useYn: string;
}

interface IUserPwdDto {
  id: number;
  pwd: string;
}

export { IUser, IUserDto, IUserPwdDto };
