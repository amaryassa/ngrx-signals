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

// CounterStore can be also defined in the functional way:
export const CounterStore2 = signalStore(
  // { providedIn: 'root' },
  withState(initialState),
  withSignals(({ count }) => ({
    doubleCount: selectSignal(() => count() * 2),
  })),
  withMethods(({ $update, count }) => {
    console.log('****************************');
    return {
      increment: () => {
        console.log('increment');
        return $update({ count: count() + 1 });
      },
      decrement: () => $update({ count: count() - 1 }),
    };
  }),
  withHooks({
    onInit({ count }) {
      console.log('******', count());
      effect(() => console.log('count changed', count()));
    },
    onDestroy() {
      console.log('on destroy');
    },
  })
);
