import { Timestamp } from "rxjs";

export interface RolesResponse {
  data: Roles[];
  meta: Meta;
}

export interface Roles {
  id:          number;
  name:       string;
  description: string;
  createdBy:   null | string;
  modifiedBy:  null | string;
  deletedBy:   null | string;
  createdAt:   null | Date;
  updatedAt:   null | Date;
  deletedAt:   null | Date; // Cambiado para aceptar null
}


export interface Meta {
   total:    number;
    page:     number;
    perPage:  number;
    lastPage: number;
}
