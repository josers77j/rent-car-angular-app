import { Branches, BranchesResponse } from "../interfaces/branch.interfaces";


export class BranchMapper {
  static mapBranchResponseToUserArray(response: BranchesResponse): Branches[] {
    return response.data;
  }
}
