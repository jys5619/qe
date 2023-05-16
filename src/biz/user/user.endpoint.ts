import { useQuasar } from 'quasar';
import { IUserDto } from './dto/user.dto';
import { IUser } from './user.entity';
import { userService } from './user.service';

/**
 * 사용자 목록 조회
 * @param searchKeyword
 * @returns
 */
async function getUserList(searchKeyword: string): Promise<IUser[] | void>{

  return await window.api
    .selectUserList(searchKeyword || '').then<IUser[], never>((res: IUserDto[]) => {
      const userList: IUser[] = res.map((row: IUserDto) => {
        return userService.convertIUser(row);
      });
      const $q = useQuasar();
      $q.notify({
        type: 'positive',
        message: `${userList.length} data was retrieved.`
      });

      return userList;
    }).catch((reason:any) => {
      const $q = useQuasar();
      $q.notify({
        type: 'negative',
        message: `${reason}`
      })
    });
}

/**
 * 사용자 정보 저장
 * id가 null, undefined, 1보다 작은경우 신규로 등록된다.
 * @param userDto
 * @returns
 */
async function saveUser(user: Partial<IUser>): Promise<void> {
  const $q = useQuasar();
  const userDto = userService.convertIUserDto(user);
  const result = await window.api.saveUser(userDto).then((value:number) => {
    console.log('value :', value);
  }).catch((reason:any) => {
    $q.notify({
    type: 'negative',
    message: `${reason}`
  })
  });

  return result;
}

const userEndpoint = {
  getUserList,
  saveUser,
};

export { userEndpoint };
