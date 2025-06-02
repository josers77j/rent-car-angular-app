import { Component, computed, input } from '@angular/core';
import { Users } from '../../interfaces/user.interfaces';
import { TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'user-table',
  imports: [TitleCasePipe, RouterLink],
  templateUrl: './user-table.component.html',
})
export class UserTableComponent {
  users = input.required<Users[]>();

}
