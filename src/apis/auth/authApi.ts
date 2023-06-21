import instance from '../_axios/instance';
import { User } from './authApi.type';

export class AuthApi {
  async signin(body: User) {
    const response = await instance({
      method: 'POST',
      url: '/auth/signin',
      data: body,
    });
    return response;
  }

  async signUp(body: User) {
    const response = await instance({
      method: 'POST',
      url: '/auth/signup',
      data: body,
    });
    return response;
  }
}
