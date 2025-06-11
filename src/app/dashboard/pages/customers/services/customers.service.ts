import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
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
  createdAt: new Date(),
  updatedAt: new Date(),
  date:      new Date(),
  modifiedBy: 0,
  modified:   '',
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

    return this.http
      .get<CustomersResponse>(`${baseUrl}/customers/all`, {
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
    .post<Customers>(`${baseUrl}/customers`, customer)
    .pipe(
      tap((resp) => console.log('creando',resp))
    );

  }

  updateCustomer(
    id: number,
    userLike: Partial<Customer>
  ): Observable<Customers> {
    return this.http
      .patch<Customers>(`${baseUrl}/customers/${id}`, userLike)
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
      .get<CustomersResponse>(`${baseUrl}/customers/all`,{
        params:{
          customerId: id
        }
      } )
      .pipe(
        map((customerData) => customerData.data[0]),
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
