import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { FxReceiptPurposeTypeFormService, FxReceiptPurposeTypeFormGroup } from './fx-receipt-purpose-type-form.service';
import { IFxReceiptPurposeType } from '../fx-receipt-purpose-type.model';
import { FxReceiptPurposeTypeService } from '../service/fx-receipt-purpose-type.service';

@Component({
  selector: 'jhi-fx-receipt-purpose-type-update',
  templateUrl: './fx-receipt-purpose-type-update.component.html',
})
export class FxReceiptPurposeTypeUpdateComponent implements OnInit {
  isSaving = false;
  fxReceiptPurposeType: IFxReceiptPurposeType | null = null;

  editForm: FxReceiptPurposeTypeFormGroup = this.fxReceiptPurposeTypeFormService.createFxReceiptPurposeTypeFormGroup();

  constructor(
    protected fxReceiptPurposeTypeService: FxReceiptPurposeTypeService,
    protected fxReceiptPurposeTypeFormService: FxReceiptPurposeTypeFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ fxReceiptPurposeType }) => {
      this.fxReceiptPurposeType = fxReceiptPurposeType;
      if (fxReceiptPurposeType) {
        this.updateForm(fxReceiptPurposeType);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const fxReceiptPurposeType = this.fxReceiptPurposeTypeFormService.getFxReceiptPurposeType(this.editForm);
    if (fxReceiptPurposeType.id !== null) {
      this.subscribeToSaveResponse(this.fxReceiptPurposeTypeService.update(fxReceiptPurposeType));
    } else {
      this.subscribeToSaveResponse(this.fxReceiptPurposeTypeService.create(fxReceiptPurposeType));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFxReceiptPurposeType>>): void {
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

  protected updateForm(fxReceiptPurposeType: IFxReceiptPurposeType): void {
    this.fxReceiptPurposeType = fxReceiptPurposeType;
    this.fxReceiptPurposeTypeFormService.resetForm(this.editForm, fxReceiptPurposeType);
  }
}
