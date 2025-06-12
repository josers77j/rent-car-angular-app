import { Component, computed, input } from '@angular/core';
import { Vehicles } from '../../interfaces/vehicle.interfaces';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'vehicle-table',
  imports: [TitleCasePipe, RouterLink, DatePipe],
  templateUrl: './vehicle-table.component.html',
})
export class VehicleTableComponent {
  vehicles = input.required<Vehicles[]>();

}
