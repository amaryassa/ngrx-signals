import { computed, effect, Injectable } from '@angular/core';
import {
  signalStore,
  withHooks,
  withMethods,
  withComputed,
  withState,
  patchState,
} from '@ngrx/signals';

const initialState = { count: 0 };

// CounterStore can be also defined in the functional way:
export const CounterStore2 = signalStore(
  // { providedIn: 'root' },
  withState(initialState),
  withComputed(({ count }) => ({
    doubleCount: computed(() => count() * 2),
  })),

  withMethods((state) => {
    return {
      increment: () => {
        patchState(state, { count: state.count() + 1 });
      },
      decrement: () => {
        patchState(state, { count: state.count() - 1 });
      },
    };
  }),
  withHooks({
    onInit(state) {
      console.log('****** init CounterStore2', state);
      effect(() => console.log('count changed', state.count()));
    },
    onDestroy(state) {
      console.log('****** onDestroy CounterStore2', state);
    },
  })
);
