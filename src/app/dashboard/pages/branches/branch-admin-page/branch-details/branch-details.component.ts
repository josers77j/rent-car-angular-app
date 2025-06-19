import { Component, EventEmitter, inject, input, OnInit, Output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { FormUtils } from '../../../../../utils/form-utils';
import { Branches, Branch } from '../../interfaces/branch.interfaces';
import { BranchesService } from '../../services/branches.service';
import { FormErrorLabelComponent } from '../../../../../shared/components/form-error-label/form-error-label.component';
import { BranchUpdateService } from '../../services/branch-update.service';



@Component({
  selector: 'branch-details',
  imports: [ReactiveFormsModule, FormErrorLabelComponent],
  templateUrl: './branch-details.component.html',
})
export class BranchDetailsComponent   implements OnInit   {

  @Output() branchUpdated = new EventEmitter<void>();
  branch = input.required<Branches>();
  router = inject(Router);
  fb = inject(FormBuilder);
  BranchUpdateService = inject(BranchUpdateService);
  branchesService = inject(BranchesService);
  wasSaved = signal(false);

  branchForm = this.fb.group({
    state: ['', [Validators.required, Validators.pattern(FormUtils.generalTextPattern)]],
    city: ['', [Validators.required, Validators.pattern(FormUtils.generalTextPattern)]],
    district: ['', [Validators.required, Validators.pattern(FormUtils.generalTextPattern)]],
  });


    ngOnInit(): void {
    this.setFormValue(this.branch());
    console.log('mi sucursal ', this.branch());
  }

  setFormValue(formLike: Partial<Branches>) {
    this.branchForm.reset({
      state: formLike.state || '',
      city: formLike.city || '',
      district: formLike.district || '',
    });
  }

  async onSubmit() {
    const isValid = this.branchForm.valid;
    this.branchForm.markAllAsTouched();

    if (!isValid) return;

    const formValue = this.branchForm.value;
    const branch: Branch = {
      state: formValue.state!,
      city: formValue.city!,
      district: formValue.district!,
    };

    if (!this.branch().id) {
      // Crear sucursal
      const branchResponse: Branches = await firstValueFrom(
        this.branchesService.createBranch(branch)
      );
      console.log('Sucursal creada:', branchResponse);
    } else {
      // Actualizar sucursal
      await firstValueFrom(
        this.branchesService.updateBranch(this.branch().id, branch)
      );
      console.log('Sucursal actualizada');
    }

    // Notificar que una sucursal fue creada o actualizada
    this.BranchUpdateService.notifyBranchUpdated();

    // Navegar de regreso a la lista de sucursales
    this.router.navigate(['/services/branches']);
  }

}
