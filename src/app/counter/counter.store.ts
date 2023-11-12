import { computed, effect, Injectable } from '@angular/core';
import { patchState, signalStore, withState } from '@ngrx/signals';

const initialState = { count: 0 };

@Injectable()
export class CounterStore extends signalStore(withState(initialState)) {
  readonly doubleCount = computed(() => this.count() * 2);

  readonly #logOnCountChange = effect(() => {
    console.log('count changed', this.count());
  });

  increment(): void {
    patchState(this, { count: this.count() + 1 });
    // this.$update({ count: this.count() + 1 });
  }

  decrement(): void {
    patchState(this, { count: this.count() - 1 });
    // this.$update({ count: this.count() - 1 });
  }
}
