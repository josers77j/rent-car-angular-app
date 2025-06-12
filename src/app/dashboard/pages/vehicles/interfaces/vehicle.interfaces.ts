import { Timestamp } from "rxjs";

export interface VehiclesResponse {
  data: Vehicles[];
  meta: Meta;
}

export interface Vehicles {
  id:        number;
  plateNumber:      string;
  brand:     string;
  model:    string;
  type:    string;
  createdAt: Date;
  year:      number;
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

export interface Vehicle {
  plateNumber:      string;
  brand:     string;
  model:    string;
  type:    string;
  year:      number;
 }
