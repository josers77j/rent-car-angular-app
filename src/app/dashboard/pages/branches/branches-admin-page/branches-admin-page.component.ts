import { Component, inject, signal } from '@angular/core';
import { BranchTableComponent } from '../components/branch-table/branch-table.component';
import { BranchesService } from '../services/branches.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { PaginationService } from '../../../../shared/components/pagination/pagination.service';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BranchUpdateService } from '../services/branch-update.service';

@Component({
  selector: 'app-branches-admin-page',
  imports: [BranchTableComponent, PaginationComponent, RouterLink],
  templateUrl: './branches-admin-page.component.html',
})
export class BranchesAdminPageComponent {
  branchesService = inject(BranchesService);
  paginationService = inject(PaginationService);

  constructor(private branchUpdateService: BranchUpdateService) {
    // Suscribirse al evento de actualización de sucursales
    this.branchUpdateService.branchUpdated$.subscribe(() => {
      console.log('Sucursal actualizada, recargando tabla...');
      this.branchesResource.reload();
    });
  }
  branchesPerPage = signal(10);

branchesResource = rxResource({
  request: () => ({
    page: this.paginationService.currentPage(),
    limit: this.branchesPerPage(),
  }),
  loader: ({ request }) => {
    console.log('recargando... :D', request);
    return this.branchesService.getBranches({
      page: request.page,
      perPage: request.limit,
    });
  },
});
 }
