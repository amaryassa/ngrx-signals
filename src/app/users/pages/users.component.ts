import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from '../components/user-list/user-list.component';
import { UsersStore } from '../store/users.store';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, RouterOutlet, UserListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-user-list
      [users]="store.users()"
      [isLoading]="store.isLoading()"
    ></app-user-list>
  `,
})
export class UsersComponent {
  readonly store = inject(UsersStore);
}
