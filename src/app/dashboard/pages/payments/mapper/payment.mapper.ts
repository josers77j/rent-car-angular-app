import { Payments, PaymentsResponse } from "../interfaces/payment.interfaces";


export class PaymentMapper {
  static mapPaymentResponseToCustomerArray(response: PaymentsResponse): Payments[] {
    return response.data;
  }
}
