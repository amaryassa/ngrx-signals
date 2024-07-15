import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingComponent, NavBarComponent } from './shared/components';
import { UsersStore } from './store/user';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, LoadingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public readonly store = inject(UsersStore);
}
