import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '../models/user.model';

export const URL_API = 'http://localhost:3000';

@Injectable({ providedIn: 'root' })
export class UsersService {
  #httpClient = inject(HttpClient);

  getAllUsers = () => this.#httpClient.get<User[]>(`${URL_API}/users`);

  getOneUser = (id: number) =>
    this.#httpClient.get<User>(`${URL_API}/users/${id}`);
}
