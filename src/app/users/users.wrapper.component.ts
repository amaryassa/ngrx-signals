import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersStore } from './store/users.store';
import { RouterOutlet } from '@angular/router';
import { UsersComponent } from './pages/users.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, RouterOutlet, UsersComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="users-page  max-w-2xl md:mx-auto mt-8">
      <router-outlet></router-outlet>
    </div>
  `,
})
export class UsersWrapperComponent {}
