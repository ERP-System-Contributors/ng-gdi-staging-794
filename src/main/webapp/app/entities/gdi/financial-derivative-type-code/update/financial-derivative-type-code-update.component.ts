import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import {
  FinancialDerivativeTypeCodeFormService,
  FinancialDerivativeTypeCodeFormGroup,
} from './financial-derivative-type-code-form.service';
import { IFinancialDerivativeTypeCode } from '../financial-derivative-type-code.model';
import { FinancialDerivativeTypeCodeService } from '../service/financial-derivative-type-code.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-financial-derivative-type-code-update',
  templateUrl: './financial-derivative-type-code-update.component.html',
})
export class FinancialDerivativeTypeCodeUpdateComponent implements OnInit {
  isSaving = false;
  financialDerivativeTypeCode: IFinancialDerivativeTypeCode | null = null;

  editForm: FinancialDerivativeTypeCodeFormGroup = this.financialDerivativeTypeCodeFormService.createFinancialDerivativeTypeCodeFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected financialDerivativeTypeCodeService: FinancialDerivativeTypeCodeService,
    protected financialDerivativeTypeCodeFormService: FinancialDerivativeTypeCodeFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ financialDerivativeTypeCode }) => {
      this.financialDerivativeTypeCode = financialDerivativeTypeCode;
      if (financialDerivativeTypeCode) {
        this.updateForm(financialDerivativeTypeCode);
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
    const financialDerivativeTypeCode = this.financialDerivativeTypeCodeFormService.getFinancialDerivativeTypeCode(this.editForm);
    if (financialDerivativeTypeCode.id !== null) {
      this.subscribeToSaveResponse(this.financialDerivativeTypeCodeService.update(financialDerivativeTypeCode));
    } else {
      this.subscribeToSaveResponse(this.financialDerivativeTypeCodeService.create(financialDerivativeTypeCode));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFinancialDerivativeTypeCode>>): void {
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

  protected updateForm(financialDerivativeTypeCode: IFinancialDerivativeTypeCode): void {
    this.financialDerivativeTypeCode = financialDerivativeTypeCode;
    this.financialDerivativeTypeCodeFormService.resetForm(this.editForm, financialDerivativeTypeCode);
  }
}
