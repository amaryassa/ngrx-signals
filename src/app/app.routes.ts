import { Route } from '@angular/router';
import { CounterComponent } from './counter/counter.component';
import { Counter2Component } from './counter2/counter.component';

export const routes: Route[] = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'counter', component: CounterComponent },
  { path: 'counter2', component: Counter2Component },
];
