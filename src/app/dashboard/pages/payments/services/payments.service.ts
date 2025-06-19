import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { Payment, Payments, PaymentsResponse } from '../interfaces/payment.interfaces';
import { environment } from '../../../../../environments/environment.development';
import { PaymentMapper } from '../mapper/payment.mapper';

const baseUrl = environment.baseUrl;
interface Options {
  perPage?: number;
  page?: number;
}

const emptyPayment: Payments = {
  id: 0,
  rentalId: 0,
  rental: '',
  amount: 0,
  paymentMethod: '',
  paymentDate: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
  date:      new Date(),
  modifiedBy: 0,
  modified:   '',
};

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  private http = inject(HttpClient);

  private _paymentsCache = new Map<string, PaymentsResponse>();
  private _paymentCache = new Map<number, Payments>();
  getPayments(options: Options): Observable<PaymentsResponse> {
    const { perPage = 9, page = 0 } = options;

    const key = `${perPage}-${page}`; // 9-0

    return this.http
      .get<PaymentsResponse>(`${baseUrl}/payment`, {
        params: {
          perPage,
          page,
        },
      })
      .pipe(
        tap((resp) => console.log(resp)),
      );
  }

  createPayment(payment: Payment): Observable<Payments> {

    return this.http
    .post<Payments>(`${baseUrl}/payment`, payment)
    .pipe(
      tap((resp) => console.log('creando',resp))
    );

  }

  updatePayment(
    id: number,
    paymentLike: Partial<Payment>
  ): Observable<Payments> {
    return this.http
      .patch<Payments>(`${baseUrl}/payment/${id}`, paymentLike)
      .pipe(
        tap((resp) => console.log('actualizando ',resp))
      );
  }

  getPaymentById(id: number): Observable<Payments> {
    if (!id) {
      return of(emptyPayment);
    }

    if (this._paymentCache.has(id)) {
      return of(this._paymentCache.get(id)!);
    }

    return this.http
      .get<PaymentsResponse>(`${baseUrl}/payment`,{
        params:{
          paymentId: id
        }
      } )
      .pipe(
        map((paymentData) => paymentData.data[0]),
      );
  }

}
