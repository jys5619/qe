import endpointUtil from '../common/endpoint.util';
import { ILoginData, IAuthDto } from './auth.entity';

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
