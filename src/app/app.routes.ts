import { Route } from '@angular/router';
import { Counter2Component } from './counter2/counter.component';
import { UsersComponent } from './users/pages/users.component';
import { UsersWrapperComponent } from './users/users.wrapper.component';
import { ProfileComponent } from './users/components/profile/profile.component';
import { UserInformationComponent } from './users/pages/user-information.component';

export const routes: Route[] = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'counter2', component: Counter2Component },
  {
    path: 'users',
    component: UsersWrapperComponent,
    children: [
      { path: '', component: UsersComponent },
      { path: ':id', component: UserInformationComponent },
    ],
  },
];
