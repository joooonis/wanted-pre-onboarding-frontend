import instance from '../_axios/instance';
import { Todo } from './todoApi.type';

export class TodoApi {
  async getTodos(): Promise<Todo[]> {
    const { data } = await instance({
      method: 'GET',
      url: '/todos',
    });
    return data;
  }
  async createTodo(body: { todo: string }): Promise<Todo> {
    const { data } = await instance({
      method: 'POST',
      url: '/todos',
      data: body,
    });
    return data;
  }

  async updateTodo(id: number, body: Partial<Todo>): Promise<Todo> {
    const { data } = await instance({
      method: 'PUT',
      url: `/todos/${id}`,
      data: body,
    });
    return data;
  }

  async deleteTodo(id: number) {
    const { data } = await instance({
      method: 'DELETE',
      url: `/todos/${id}`,
    });
    return data;
  }
}
