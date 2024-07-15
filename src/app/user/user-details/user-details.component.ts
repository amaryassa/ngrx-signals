import { Component, effect, inject, input, OnInit } from '@angular/core';
import { UsersStore } from '../../store/user';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
})
export class UserDetailsComponent implements OnInit {
  public readonly store = inject(UsersStore);

  id = input.required<string>();

  ngOnInit(): void {
    if (!!this.id()) {
      this.#getUser(this.id());
    }
  }

  #getUser(id: string): void {
    this.store.getUserAsPromise(id);
  }
}
