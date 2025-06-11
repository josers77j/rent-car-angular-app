import { Customers, CustomersResponse } from "../interfaces/customer.interfaces";


export class CustomerMapper {
  static mapCustomerResponseToUserArray(response: CustomersResponse): Customers[] {
    return response.data;
  }
}
