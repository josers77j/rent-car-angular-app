import { Component, computed, input } from '@angular/core';
import { Branches } from '../../interfaces/branch.interfaces';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'branch-table',
  imports: [TitleCasePipe, RouterLink, DatePipe],
  templateUrl: './branch-table.component.html',
})
export class BranchTableComponent {
  branches = input.required<Branches[]>();

}
