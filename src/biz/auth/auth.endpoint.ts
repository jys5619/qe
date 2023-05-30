import endpointUtil from '../common/endpoint.util';
import { ILoginData } from './auth.entity';
import { IAuthDto } from './dto/auth.dto';

/**
 * 로그인
 * @param searchKeyword
 * @returns
 */
async function login(loginData: ILoginData): Promise<IAuthDto | undefined> {
  return endpointUtil.get<IAuthDto>(window.api.login(loginData));
}

const authEndpoint = {
  login,
};

export { authEndpoint };
