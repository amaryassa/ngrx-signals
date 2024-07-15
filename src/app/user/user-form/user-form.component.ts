import { JsonPipe } from '@angular/common';
import {
  Component,
  computed,
  effect,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsersStore } from '../../store/user';
import { patchState, signalState } from '@ngrx/signals';
import { User } from '../../shared/models';
import { Router } from '@angular/router';

const initValue: User = {
  firstName: '',
  lastName: '',
  email: '',
  image: '',
  age: 0,
};

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [JsonPipe, FormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent implements OnInit {
  public readonly store = inject(UsersStore);

  id = input.required<string>();

  readonly formValueState = signalState<User>(initValue);

  image = computed(() => {
    return `https://robohash.org/${this.formValueState()?.image}`;
  });

  editMode = computed(() => !!this.store.currentUser());

  async ngOnInit(): Promise<void> {
    if (!!this.id()) {
      await this.#getUser(this.id());
      const currentUser = this.store.currentUser();
      if (currentUser) {
        patchState(this.formValueState, currentUser);
      }
    }
  }

  async #getUser(id: string): Promise<void> {
    await this.store.getUserAsPromise(id);
  }

  UpdateFirstName() {
    patchState(this.formValueState, { firstName: 'toto' });
  }

  onSubmit(): void {
    if (this.editMode()) {
      this.store.updateUser(this.formValueState);
    } else {
      patchState(this.formValueState, {
        image: `https://robohash.org/${this.formValueState().image}`,
      });
      this.store.addUser(this.formValueState());
    }
  }
}
