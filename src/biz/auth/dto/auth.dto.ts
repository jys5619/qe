import { ErrorResult } from 'src/biz/common/common';
import { IUserDto } from 'src/biz/user';

export interface IAuthDto {
  user?: IUserDto
  errorResult?: ErrorResult
}
