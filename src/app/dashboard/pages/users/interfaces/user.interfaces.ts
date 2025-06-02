export interface UsersResponse {
  data: Users[];
  meta: Meta;
}

export interface Users {
  id:        number;
  name:      string;
  email:     string;
  roleId:    number;
  createdAt: Date;
  role:      string;
}

export interface Meta {
  total:       number;
  lastpage:    number;
  page: number;
  prev:        null;
  next:        number;
  perPage:     number;
}

export interface User {
  email: string;
  name:  string;
  roleId:  number;
 }


 export interface RoleItem {
  id:number;
  name:string;
  description:string;
  createdAt:Date;
  updatedAt:Date;
 }
