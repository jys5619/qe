import { useStoreUser } from 'src/stores';
import { authEndpoint } from './auth.endpoint';
import { ILoginData } from './auth.entity';
import { userService } from '../user';
import { IAuthDto } from './dto/auth.dto';

const login = async (loginData: ILoginData): Promise<boolean> => {
  return authEndpoint.login(loginData).then((authDto?: IAuthDto) => {
    let isSuccess = false;
    const storeUser = useStoreUser();
    if (!!authDto?.errorResult ) {
      alert(authDto?.errorResult?.msg);
      isSuccess = false;
    } else if ( authDto?.user ) {
      const user = userService.convertIUser(authDto.user);
      storeUser.set(user);
      isSuccess = true;
    } else {
      alert('unknown error!!');
      isSuccess = false;
    }

    return Promise.resolve(isSuccess);
  });
}


const authService = {
  login,
};

export { authService };
