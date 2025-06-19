import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { Branch, Branches, BranchesResponse } from '../interfaces/branch.interfaces';
import { environment } from '../../../../../environments/environment.development';
import { BranchMapper } from '../mapper/branch.mapper';

const baseUrl = environment.baseUrl;
interface Options {
  perPage?: number;
  page?: number;
}

const emptyBranch: Branches = {
  id: 0,
  district: '',
  city: '',
  state: '',
  createdAt: new Date(),
  updatedAt: new Date(),
  date:      new Date(),
  modifiedBy: 0,
  modified:   '',
};

@Injectable({
  providedIn: 'root'
})
export class BranchesService {

  private http = inject(HttpClient);

  private _branchesCache = new Map<string, BranchesResponse>();
  private _branchCache = new Map<number, Branches>();
  getBranches(options: Options): Observable<BranchesResponse> {
    const { perPage = 9, page = 0 } = options;

    const key = `${perPage}-${page}`; // 9-0

    return this.http
      .get<BranchesResponse>(`${baseUrl}/branch`, {
        params: {
          perPage,
          page,
        },
      })
      .pipe(
        tap((resp) => console.log(resp)),
      );
  }

  createBranch(branch: Branch): Observable<Branches> {

    return this.http
    .post<Branches>(`${baseUrl}/branch`, branch)
    .pipe(
      tap((resp) => console.log('creando',resp))
    );

  }

  updateBranch(
    id: number,
    branchLike: Partial<Branch>
  ): Observable<Branches> {
    return this.http
      .patch<Branches>(`${baseUrl}/branch/${id}`, branchLike)
      .pipe(
        tap((resp) => console.log('actualizando ',resp))
      );
  }

  getBranchById(id: number): Observable<Branches> {
    if (!id) {
      return of(emptyBranch);
    }

    if (this._branchCache.has(id)) {
      return of(this._branchCache.get(id)!);
    }

    return this.http
      .get<BranchesResponse>(`${baseUrl}/branch`,{
        params:{
          userId: id
        }
      } )
      .pipe(
        map((branchData) => branchData.data[0]),
      );
  }

}
