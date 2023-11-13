import { computed, effect, inject } from '@angular/core';
import {
  signalStore,
  withHooks,
  withMethods,
  withComputed,
  withState,
  patchState,
} from '@ngrx/signals';
import { User } from '../models/user.model';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, take, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';

type State = { users: User[]; currentUser: User | null; isLoading: boolean };

const initialState: State = {
  users: [],
  currentUser: null,
  isLoading: false,
};
export const UsersStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  // withComputed((store) => ({
  //   fullName: computed(
  //     () => `${store.currentUser()?.firstName} ${store.currentUser()?.lastName} `
  //   ),
  // })),

  //loading functions
  withMethods((store, usersService = inject(UsersService)) => ({
    loadAllUsers: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() =>
          usersService.getAllUsers().pipe(
            tapResponse({
              next: (users) => patchState(store, { users }),
              error: console.error,
              finalize: () => patchState(store, { isLoading: false }),
            }),
          ),
        ),
      ),
    ),
    loadOneUser: rxMethod<number>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((id) =>
          usersService.getOneUser(id).pipe(
            tapResponse({
              next: (currentUser) => patchState(store, { currentUser }),
              error: console.error,
              finalize: () => patchState(store, { isLoading: false }),
            }),
          ),
        ),
      ),
    ),
  })),

  // editing functions
  withMethods(
    (store, usersService = inject(UsersService), router = inject(Router)) => ({
      addUser: rxMethod<User>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          take(1),
          switchMap((user) =>
            usersService.addUser(user).pipe(
              tapResponse({
                next: () => {
                  store.loadAllUsers();
                  router.navigate(['/', 'users']);
                },
                error: console.error,
                finalize: () => patchState(store, { isLoading: false }),
              }),
            ),
          ),
        ),
      ),
    }),
  ),

  withHooks({
    onInit(store) {
      console.log('****** init UsersStore', store);
      store.loadAllUsers();
    },
    onDestroy(store) {
      console.log('****** onDestroy UsersStore', store);
    },
  }),
);
