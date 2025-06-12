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
  createdAt: Date;
  identification:      string;
  identificationType:      string;
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
  email: string;
  name:  string;
  phone: string;
  identification:      string;
  identificationType:      string;
 }


 export interface IdentificationTypeItem {
  id:number;
  name:string;
  description:string;
  createdAt:Date;
  updatedAt:Date;
 }
