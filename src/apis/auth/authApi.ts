import instance from '../_axios/instance';
import { Token, User } from './authApi.type';

export class AuthApi {
  async signIn(body: User): Promise<Token> {
    const { data } = await instance({
      method: 'POST',
      url: '/signin',
      data: body,
    });
    return data;
  }

  async signUp(body: User) {
    const { data } = await instance({
      method: 'POST',
      url: '/signup',
      data: body,
    });
    return data;
  }
}
