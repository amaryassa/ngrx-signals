import { effect, Injectable } from '@angular/core';
import {
  selectSignal,
  signalStore,
  withHooks,
  withMethods,
  withSignals,
  withState,
} from '@ngrx/signals';

const initialState = { count: 0 };

@Injectable()
export class CounterStore extends signalStore(withState(initialState)) {
  readonly doubleCount = selectSignal(() => this.count() * 2);

  readonly #logOnCountChange = effect(() => {
    console.log('count changed', this.count());
  });

  increment(): void {
    console.log('increment Method');
    this.$update({ count: this.count() + 1 });
  }

  decrement(): void {
    console.log('decrement Method');
    this.$update({ count: this.count() - 1 });
  }
}
