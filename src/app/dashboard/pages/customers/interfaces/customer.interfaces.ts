import { Timestamp } from "rxjs";

export interface CustomersResponse {
  data: Customers[];
  meta: Meta;
}

export interface Customers {
  id:        number;
  name:      string;
  phone:     string;
  email:     string;
  address:    string;
  identification:      string;
  identificationType:      string;
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

export interface Customer {
  name:  string;
  phone: string;
  email: string;
  address:    string;
  identification:      string;
  identificationType:      string;
 }
