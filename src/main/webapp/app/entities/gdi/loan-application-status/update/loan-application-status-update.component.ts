import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { LoanApplicationStatusFormService, LoanApplicationStatusFormGroup } from './loan-application-status-form.service';
import { ILoanApplicationStatus } from '../loan-application-status.model';
import { LoanApplicationStatusService } from '../service/loan-application-status.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-loan-application-status-update',
  templateUrl: './loan-application-status-update.component.html',
})
export class LoanApplicationStatusUpdateComponent implements OnInit {
  isSaving = false;
  loanApplicationStatus: ILoanApplicationStatus | null = null;

  editForm: LoanApplicationStatusFormGroup = this.loanApplicationStatusFormService.createLoanApplicationStatusFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected loanApplicationStatusService: LoanApplicationStatusService,
    protected loanApplicationStatusFormService: LoanApplicationStatusFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ loanApplicationStatus }) => {
      this.loanApplicationStatus = loanApplicationStatus;
      if (loanApplicationStatus) {
        this.updateForm(loanApplicationStatus);
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
    const loanApplicationStatus = this.loanApplicationStatusFormService.getLoanApplicationStatus(this.editForm);
    if (loanApplicationStatus.id !== null) {
      this.subscribeToSaveResponse(this.loanApplicationStatusService.update(loanApplicationStatus));
    } else {
      this.subscribeToSaveResponse(this.loanApplicationStatusService.create(loanApplicationStatus));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILoanApplicationStatus>>): void {
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

  protected updateForm(loanApplicationStatus: ILoanApplicationStatus): void {
    this.loanApplicationStatus = loanApplicationStatus;
    this.loanApplicationStatusFormService.resetForm(this.editForm, loanApplicationStatus);
  }
}
