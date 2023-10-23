import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { FxCustomerTypeFormService, FxCustomerTypeFormGroup } from './fx-customer-type-form.service';
import { IFxCustomerType } from '../fx-customer-type.model';
import { FxCustomerTypeService } from '../service/fx-customer-type.service';

@Component({
  selector: 'jhi-fx-customer-type-update',
  templateUrl: './fx-customer-type-update.component.html',
})
export class FxCustomerTypeUpdateComponent implements OnInit {
  isSaving = false;
  fxCustomerType: IFxCustomerType | null = null;

  editForm: FxCustomerTypeFormGroup = this.fxCustomerTypeFormService.createFxCustomerTypeFormGroup();

  constructor(
    protected fxCustomerTypeService: FxCustomerTypeService,
    protected fxCustomerTypeFormService: FxCustomerTypeFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ fxCustomerType }) => {
      this.fxCustomerType = fxCustomerType;
      if (fxCustomerType) {
        this.updateForm(fxCustomerType);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const fxCustomerType = this.fxCustomerTypeFormService.getFxCustomerType(this.editForm);
    if (fxCustomerType.id !== null) {
      this.subscribeToSaveResponse(this.fxCustomerTypeService.update(fxCustomerType));
    } else {
      this.subscribeToSaveResponse(this.fxCustomerTypeService.create(fxCustomerType));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFxCustomerType>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(fxCustomerType: IFxCustomerType): void {
    this.fxCustomerType = fxCustomerType;
    this.fxCustomerTypeFormService.resetForm(this.editForm, fxCustomerType);
  }
}
