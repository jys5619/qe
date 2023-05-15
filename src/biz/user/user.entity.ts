export interface IUser {
  id: number;
  userId: string;
  pwd?: string;
  email: string;
  names: string;
  enames: string;
  emno?: string;
  auth: string[];
  useYn: string;
}
