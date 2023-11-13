import { Component, computed, inject, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormDirective } from '../../../shared/directives/form.directive';
import { patchState, signalState } from '@ngrx/signals';
import { User } from '../../models/user.model';
import { UsersStore } from '../../store/users.store';

const initValue: User = {
  firstName: '',
  lastName: '',
  email: '',
  image: '',
  age: 0,
};
@Component({
  selector: 'app-manage-user',
  standalone: true,
  imports: [FormsModule, FormDirective, JsonPipe],
  templateUrl: './manage-user.component.html',
})
export class ManageUserComponent {
  public readonly store = inject(UsersStore);

  protected readonly formValueState = signalState<User>(initValue);
  // protected readonly formValueState = signal<User>(initValue);

  public image = computed(
    () => `https://robohash.org/${this.formValueState()?.image}`,
  );

  protected setFormValue(e: User): void {
    patchState(this.formValueState, e);
    // this.formValueState.set(e);
  }

  protected UpdateFirstName() {
    patchState(this.formValueState, { firstName: 'toto' });

    // this.formValueState.update((oldValue) => ({
    //   ...oldValue,
    //   firstName: 'toto',
    // }));
  }

  protected onSubmit(): void {
    patchState(this.formValueState, {
      image: `https://robohash.org/${this.formValueState().image}`,
    });
    this.store.addUser(this.formValueState);
    this.resetForm();
  }

  private resetForm() {
    patchState(this.formValueState, initValue);
    // this.formValueState.set(initValue);
  }
}
