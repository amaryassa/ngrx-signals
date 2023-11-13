import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UseriIemComponent {
  @Input({ required: true }) user!: User;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}

  public navigateToUser(id: number): void {
    this.router.navigate([id], { relativeTo: this.route });
  }
}
