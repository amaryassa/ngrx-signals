import {
  signalStore,
  withMethods,
  withState,
  patchState,
  withHooks,
} from '@ngrx/signals';
import { User } from '../../shared/models';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { UsersService } from './user.service';
import { Router } from '@angular/router';
import {
  setErrors,
  setLoaded,
  setLoading,
  withRequestStatus,
} from '../request.feature';
import { HttpErrorResponse } from '@angular/common/http';

type State = {
  users: User[];
  currentUser: User | null;
  /*loading: boolean*/
};

const initialState: State = {
  users: [],
  currentUser: null,
  // loading: false,
};

export const UsersStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withRequestStatus(),
  withMethods(
    (state, usersService = inject(UsersService), router = inject(Router)) => ({
      async getUsersAsPromise() {
        patchState(state, setLoading());

        const users = await usersService.getUsersAsPromise();
        patchState(state, { users });
        patchState(state, setLoaded());
      },

      async getUserAsPromise(id: string) {
        patchState(state, setLoading());
        const currentUser = await usersService.getUserAsPromise(id);
        patchState(state, { currentUser });
        patchState(state, setLoaded());
      },
      addUser: rxMethod<User>(
        pipe(
          switchMap((value) => {
            patchState(state, setLoading());
            return usersService.addUser(value).pipe(
              tapResponse({
                next: (user) => {
                  patchState(state, { users: [...state.users(), user] });
                  router.navigate(['/users', user.id]);
                },
                error: (err: HttpErrorResponse) =>
                  patchState(state, setErrors(err.error)),
                finalize: () => patchState(state, setLoaded()),
              })
            );
          })
        )
      ),
      updateUser: rxMethod<User>(
        switchMap((user) => {
          patchState(state, setLoading());

          return usersService.updateUser(user).pipe(
            tapResponse({
              next: (updatedUser) => {
                const allUsers = [...state.users()];
                const index = allUsers.findIndex((x) => x.id === user.id);
                allUsers[index] = updatedUser;

                router.navigate(['/users', updatedUser.id]);
                patchState(state, { users: allUsers });
              },
              error: (err: HttpErrorResponse) =>
                patchState(state, setErrors(err.error)),
              finalize: () => patchState(state, setLoaded()),
            })
          );
        })
      ),
    })
  ),
  withHooks({
    async onInit(state) {
      await state.getUsersAsPromise();
      console.log(state);
    },
    onDestroy(state) {
      console.log('****** onDestroy UsersStore', state);
    },
  })
);
