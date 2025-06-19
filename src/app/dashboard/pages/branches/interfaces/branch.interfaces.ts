import { Timestamp } from "rxjs";

export interface BranchesResponse {
  data: Branches[];
  meta: Meta;
}

export interface Branches {
  id:        number;
  district:   string;
  city:       string;
  state:      string;
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

export interface Branch {
  district:   string;
  city:       string;
  state:      string;
}
