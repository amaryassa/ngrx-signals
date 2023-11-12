import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  effect,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersStore } from '../store/users.store';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { map, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ProfileComponent } from '../components/profile/profile.component';

@Component({
  selector: 'app-user-information',
  standalone: true,
  imports: [CommonModule, ProfileComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-profile
      [user]="store.currentUser()"
      [isLoading]="store.isLoading()"
    ></app-profile>
  `,
})
export class UserInformationComponent implements OnInit {
  public readonly store = inject(UsersStore);
  public profileId = this.route.params.pipe(map((p) => +p['id']));
  public getProfile = rxMethod<number>(tap((id) => this.store.loadOneUser(id)));

  constructor(private readonly route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getProfile(this.profileId);
  }

  // #loggingEffect = effect(() =>
  //   console.log('******** on est là ', this.store.currentUser())
  // );
}
