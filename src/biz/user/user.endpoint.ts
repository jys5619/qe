import endpointUtil from '../common/endpoint.util';
import { IUser, IUserDto } from './user.entity';
import { userService } from './user.service';

/**
 * 사용자 목록 조회
 * @param searchKeyword
 * @returns
 */
async function getUserList(searchKeyword: string): Promise<IUser[]> {
  return endpointUtil
    .getList<IUserDto>(window.api.selectUserList(searchKeyword || ''))
    .then((datalist: IUserDto[]) => {
      return datalist.map((data: IUserDto) => {
        return userService.convertIUser(data);
      });
    });
}

/**
 * 사용자 정보 저장
 * id가 null, undefined, 1보다 작은경우 신규로 등록된다.
 * @param userDto
 * @returns
 */
async function saveUser(user: Partial<IUser>): Promise<number> {
  const userDto = userService.convertIUserDto(user);
  return await endpointUtil.post(window.api.saveUser(userDto));
}

const userEndpoint = {
  getUserList,
  saveUser,
};

export { userEndpoint };
