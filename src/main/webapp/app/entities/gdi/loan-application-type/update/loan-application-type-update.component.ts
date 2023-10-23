import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { LoanApplicationTypeFormService, LoanApplicationTypeFormGroup } from './loan-application-type-form.service';
import { ILoanApplicationType } from '../loan-application-type.model';
import { LoanApplicationTypeService } from '../service/loan-application-type.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-loan-application-type-update',
  templateUrl: './loan-application-type-update.component.html',
})
export class LoanApplicationTypeUpdateComponent implements OnInit {
  isSaving = false;
  loanApplicationType: ILoanApplicationType | null = null;

  editForm: LoanApplicationTypeFormGroup = this.loanApplicationTypeFormService.createLoanApplicationTypeFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected loanApplicationTypeService: LoanApplicationTypeService,
    protected loanApplicationTypeFormService: LoanApplicationTypeFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ loanApplicationType }) => {
      this.loanApplicationType = loanApplicationType;
      if (loanApplicationType) {
        this.updateForm(loanApplicationType);
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
    const loanApplicationType = this.loanApplicationTypeFormService.getLoanApplicationType(this.editForm);
    if (loanApplicationType.id !== null) {
      this.subscribeToSaveResponse(this.loanApplicationTypeService.update(loanApplicationType));
    } else {
      this.subscribeToSaveResponse(this.loanApplicationTypeService.create(loanApplicationType));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILoanApplicationType>>): void {
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

  protected updateForm(loanApplicationType: ILoanApplicationType): void {
    this.loanApplicationType = loanApplicationType;
    this.loanApplicationTypeFormService.resetForm(this.editForm, loanApplicationType);
  }
}
