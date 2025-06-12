import { Component, computed, input } from '@angular/core';
import { Customers } from '../../interfaces/customer.interfaces';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'customer-table',
  imports: [TitleCasePipe, RouterLink, DatePipe],
  templateUrl: './customer-table.component.html',
})
export class CustomerTableComponent {
  customers = input.required<Customers[]>();

}
