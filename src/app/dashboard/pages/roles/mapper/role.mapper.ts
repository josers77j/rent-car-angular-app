import { Roles, RolesResponse } from "../interfaces/role.interfaces";


export class RoleMapper {
  static mapRoleResponseToRoleArray(response: RolesResponse): Roles[] {
    return response.data;
  }
}
