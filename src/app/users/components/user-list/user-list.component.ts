import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UseriIemComponent } from '../user-item/user-item.component';
import { User } from '../../models/user.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, UseriIemComponent, RouterLink],
  templateUrl: './user-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent {
  @Input({ required: true }) users: User[] = [];
  @Input({ required: true }) isLoading = false;
  public skeletonList = Array.from(Array(6).keys());
}
