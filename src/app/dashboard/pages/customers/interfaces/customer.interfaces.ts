import { Timestamp } from "rxjs";

export interface CustomersResponse {
  data: Customers[];
  meta: Meta;
}

export interface Customers {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  identification: string;
  identificationType: string;
  createdBy: string;
  modifiedBy: string;
  deletedBy?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface Meta {
  total: number;
  lastPage: number;
  currentPage: number;  // Cambiar de "page" a "currentPage"
  perPage: number;
  prev: null | number;
  next: null | number;
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
