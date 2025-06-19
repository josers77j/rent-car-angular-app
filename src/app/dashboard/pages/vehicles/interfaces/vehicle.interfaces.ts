import { Timestamp } from "rxjs";

export interface VehiclesResponse {
  data: Vehicles[];
  meta: Meta;
}

export interface Vehicles {
  id:          number;
  brand:       string;
  model:       string;
  year:        number;
  plateNumber: string;
  type:        string;
  status:      string;
  dailyRate:   number;
  modifiedBy:  number; /* estaba en string*/
  modified:   string;
  createdAt:   Date;
  updatedAt:   Date;
  date:       Date;
}

export interface Meta {
  total:       number;
  lastpage:    number;
  page: number;
  prev:        null;
  next:        number;
  perPage:     number;
}

export interface Vehicle {
  brand:       string;
  model:       string;
  year:        number;
  plateNumber: string;
  type:        string;
  status:      string;
  dailyRate:   number;
 }
