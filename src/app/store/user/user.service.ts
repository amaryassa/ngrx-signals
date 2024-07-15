import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '../../shared/models';
import { lastValueFrom } from 'rxjs';

export const URL_API = 'http://localhost:3000';

@Injectable({ providedIn: 'root' })
export class UsersService {
  #httpClient = inject(HttpClient);

  getUsersAsPromise() {
    return lastValueFrom(this.#httpClient.get<User[]>(`${URL_API}/users`));
  }

  getUserAsPromise(id: string) {
    return lastValueFrom(this.#httpClient.get<User>(`${URL_API}/users/${id}`));
  }

  addUser = (user: User) => {
    return this.#httpClient.post<User>(`${URL_API}/users`, user);
  };

  updateUser(value: User) {
    return this.#httpClient.put<User>(`${URL_API}/userss/${value.id}`, value);
  }

  deleteUser(value: User) {
    return this.#httpClient.delete(`${URL_API}/users/${value.id}`);
  }
}
