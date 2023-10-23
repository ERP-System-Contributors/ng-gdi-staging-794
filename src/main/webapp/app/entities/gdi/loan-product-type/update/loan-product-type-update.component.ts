import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { LoanProductTypeFormService, LoanProductTypeFormGroup } from './loan-product-type-form.service';
import { ILoanProductType } from '../loan-product-type.model';
import { LoanProductTypeService } from '../service/loan-product-type.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-loan-product-type-update',
  templateUrl: './loan-product-type-update.component.html',
})
export class LoanProductTypeUpdateComponent implements OnInit {
  isSaving = false;
  loanProductType: ILoanProductType | null = null;

  editForm: LoanProductTypeFormGroup = this.loanProductTypeFormService.createLoanProductTypeFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected loanProductTypeService: LoanProductTypeService,
    protected loanProductTypeFormService: LoanProductTypeFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ loanProductType }) => {
      this.loanProductType = loanProductType;
      if (loanProductType) {
        this.updateForm(loanProductType);
      }
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe({
      error: (err: FileLoadError) =>
        this.eventManager.broadcast(new EventWithContent<AlertError>('ngGdiStaging794App.error', { message: err.message })),
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const loanProductType = this.loanProductTypeFormService.getLoanProductType(this.editForm);
    if (loanProductType.id !== null) {
      this.subscribeToSaveResponse(this.loanProductTypeService.update(loanProductType));
    } else {
      this.subscribeToSaveResponse(this.loanProductTypeService.create(loanProductType));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILoanProductType>>): void {
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

  protected updateForm(loanProductType: ILoanProductType): void {
    this.loanProductType = loanProductType;
    this.loanProductTypeFormService.resetForm(this.editForm, loanProductType);
  }
}
