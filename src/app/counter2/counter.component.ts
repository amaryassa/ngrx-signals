import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterStore2 } from './counter.store';
import { from, interval, of, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CounterStore2],
})
export class Counter2Component implements OnInit {
  readonly counterStore = inject(CounterStore2);

  // rxMethod can be also used independently
  private readonly logDoubleCount = rxMethod(
    tap(() =>
      console.log('double count (rxMethod):', this.counterStore.doubleCount()),
    ),
  );
  // private readonly logDoubleCountBis = toSignal(
  //   interval(2000).pipe(
  //     tap(() =>
  //       console.log('double count (toSignal):', this.counterStore.doubleCount())
  //     )
  //   )
  // );
  // private readonly logDoubleCountSubscibe = () =>
  //   interval(2000)
  //     .pipe(
  //       tap(() =>
  //         console.log(
  //           'double count (subscribe):',
  //           this.counterStore.doubleCount()
  //         )
  //       )
  //     )
  //     .subscribe();

  ngOnInit(): void {
    // this.logDoubleCount(interval(2000));
    // this.logDoubleCountBis();
    // this.logDoubleCountSubscibe();
  }
}
