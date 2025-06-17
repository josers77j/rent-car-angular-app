import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { IdentificationTypeItem, Customer, Customers, CustomersResponse } from '../interfaces/customer.interfaces';
import { environment } from '../../../../../environments/environment.development';
import { CustomerMapper } from '../mapper/customer.mapper';

const baseUrl = environment.baseUrl;
interface Options {
  perPage?: number;
  page?: number;
}

const emptyCustomer: Customers = {
  id: 0,
  name: '',
  phone: '',
  email: '',
  address: '',
  identification: '',
  identificationType: '',
  createdBy: '',
  modifiedBy: '',
  deletedBy: undefined,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: undefined,
};

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  private http = inject(HttpClient);

  private _customersCache = new Map<string, CustomersResponse>();
  private _customerCache = new Map<number, Customers>();
 getCustomers(options: Options): Observable<CustomersResponse> {
    const { perPage = 9, page = 0 } = options;

    const key = `${perPage}-${page}`; // 9-0

  return this.http.get<CustomersResponse>(`${baseUrl}/clients`, {

        params: {
          perPage,
          page,
        },
      })
      .pipe(
        tap((resp) => console.log(resp)),
      );
  }


   createCustomer(customer: Customer): Observable<Customers> {
  return this.http
    .post<Customers>(`${baseUrl}/clients`, customer)
    .pipe(
      tap((resp) => console.log('Cliente creado:', resp)),
      catchError((error) => {
        console.error('Error al crear cliente:', error);
        return throwError(error);
      })
    );
}



  updateCustomer(
    id: number,
    userLike: Partial<Customer>
  ): Observable<Customers> {
    return this.http
      .patch<Customers>(`${baseUrl}/clients/${id}`, userLike)
      .pipe(
        tap((resp) => console.log('actualizando ',resp))
      );
  }

  getCustomerById(id: number): Observable<Customers> {
  if (!id) {
    return of(emptyCustomer);
  }

  if (this._customerCache.has(id)) {
    return of(this._customerCache.get(id)!);
  }

  return this.http
    .get<Customers>(`${baseUrl}/clients/${id}`)
    .pipe(
      tap(customer => this._customerCache.set(id, customer)),
    );
}


  getIdentificationType(): Observable<IdentificationTypeItem[]> {
    return this.http
    .get<IdentificationTypeItem[]>(`${baseUrl}/identifications/all`)
    .pipe(
      tap((resp) => console.log(resp)),
    );

  }


}
