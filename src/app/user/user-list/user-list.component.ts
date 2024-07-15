import { Component, inject } from '@angular/core';
import { UsersStore } from '../../store/user';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  public readonly store = inject(UsersStore);
}
