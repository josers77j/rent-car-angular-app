import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa el CommonModule
import { Customers } from '../../interfaces/customer.interfaces';
import { RouterLink } from '@angular/router';
import { DatePipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'customer-table',
  standalone: true, // Indica que este es un componente standalone
  imports: [CommonModule, RouterLink, DatePipe, TitleCasePipe], // Asegúrate de incluir CommonModule aquí
  templateUrl: './customer-table.component.html',
})
export class CustomerTableComponent {
  @Input() customers: Customers[] = []; // Usa Input para recibir los datos
}
