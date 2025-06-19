import { Component, effect, inject, input, OnInit, signal } from '@angular/core';
import { Branch, Branches, BranchesResponse } from '../interfaces/branch.interfaces';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, map, tap } from 'rxjs';
import { FormUtils } from '../../../../utils/form-utils';
import { BranchesService } from '../services/branches.service';
import { toSignal, rxResource } from '@angular/core/rxjs-interop';
import { BranchDetailsComponent } from './branch-details/branch-details.component';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-branch-admin-page',
  imports: [BranchDetailsComponent],
  templateUrl: './branch-admin-page.component.html',
})
export class BranchAdminPageComponent {
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  branchesService = inject(BranchesService);



  branchId = toSignal(
    this.activatedRoute.params.pipe(map((params) => params['branchId']))
  );

  branchResource = rxResource({
    request: () => ({ id: this.branchId() }),
    loader: ({ request }) => {
      return this.branchesService.getBranchById(request.id)
    },
  });

  redirectEffect = effect(() => {
    if (this.branchResource.error()) {
      this.router.navigate(['/services/branches']);
    }
  });
 }
