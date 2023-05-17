export interface IUser {
  id: number;
  userId: string;
  email: string;
  names: string;
  enames?: string;
  emno?: string;
  auth: string[];
  useYn: string;
}

export interface IUserPwd {
  id: number;
  pwd: string;
}
