import { IUserDto } from './dto/user.dto';
import { IUser } from './user.entity';
import { userService } from './user.service';

/**
 * 사용자 목록 조회
 * @param searchKeyword
 * @returns
 */
async function getUserList(searchKeyword: string): Promise<IUser[]> {
  return await window.api
    .selectUserList(searchKeyword || '')
    .then<IUser[], never>((res: IUserDto[]) => {
      const userList: IUser[] = res.map((row: IUserDto) => {
        return userService.convertIUser(row);
      });
      return userList;
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
  return await window.api.saveUser(userDto);
}

const userEndpoint = {
  getUserList,
  saveUser,
};

export { userEndpoint };
