import { Component, computed, input } from '@angular/core';
import { Roles } from '../../interfaces/role.interfaces';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'role-table',
  imports: [TitleCasePipe, RouterLink, DatePipe],
  templateUrl: './role-table.component.html',
})
export class RoleTableComponent {
  roles = input.required<Roles[]>();

}
