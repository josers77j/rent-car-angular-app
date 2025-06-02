import { Users, UsersResponse } from "../interfaces/user.interfaces";


export class UserMapper {
  static mapUserResponseToUserArray(response: UsersResponse): Users[] {
    return response.data;
  }
}
