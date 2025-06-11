import { Timestamp } from "rxjs";

export interface RolesResponse {
  data: Roles[];
  meta: Meta;
}

export interface Roles {
  id:        number;
  name:      string;
  description:     string;
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

export interface Role {
  description: string;
  name:  string;
 }
