import { Timestamp } from "rxjs";

export interface PaymentsResponse {
  data: Payments[];
  meta: Meta;
}

export interface Payments {
  id:        number;
  rentalId:   number;
  rental: string;
  amount:     number;
  paymentMethod:     string;
  paymentDate:    Date;
  createdAt: Date;
  updatedAt: Date;
  date:      Date;
  modifiedBy: number;
  modified:   string;
}

export interface Meta {
  total:       number;
  lastpage:    number;
  page: number;
  prev:        null;
  next:        number;
  perPage:     number;
}

export interface Payment {
  rentalId:      number;
  amount:     number;
  paymentMethod:     string;
  paymentDate:    Date;
 }
