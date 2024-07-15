import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'users',
    loadComponent: () =>
      import('./user/user-list/user-list.component').then(
        (m) => m.UserListComponent
      ),
  },

  {
    path: 'users/new',
    loadComponent: () =>
      import('./user/user-form/user-form.component').then(
        (m) => m.UserFormComponent
      ),
  },
  {
    path: 'users/:id',
    loadComponent: () =>
      import('./user/user-details/user-details.component').then(
        (m) => m.UserDetailsComponent
      ),
  },
  {
    path: 'users/:id/edit',
    loadComponent: () =>
      import('./user/user-form/user-form.component').then(
        (m) => m.UserFormComponent
      ),
  },
];
