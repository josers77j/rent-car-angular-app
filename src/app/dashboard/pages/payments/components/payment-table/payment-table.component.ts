import { Component, computed, input } from '@angular/core';
import { Payments } from '../../interfaces/payment.interfaces';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'payment-table',
  imports: [TitleCasePipe, RouterLink, DatePipe],
  templateUrl: './payment-table.component.html',
})
export class PaymentTableComponent {
  payments = input.required<Payments[]>();

}
