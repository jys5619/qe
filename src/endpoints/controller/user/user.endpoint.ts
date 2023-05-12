import { IUser } from 'src/entity/entity';

/**
 * 사용자 목록 조회
 * @param searchKeyword
 * @returns
 */
export async function getUserList(searchKeyword: string): Promise<IUser[]> {
  return await window.api
    .selectUserList(searchKeyword || '')
    .then<IUser[], never>((res: IUser[]) => {
      const userList = res.map((row: IUser) => {
        row.authList = row.auth.split(',');
        return row;
      });
      return userList;
    });
}
