import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { LoanRestructureFlagFormService, LoanRestructureFlagFormGroup } from './loan-restructure-flag-form.service';
import { ILoanRestructureFlag } from '../loan-restructure-flag.model';
import { LoanRestructureFlagService } from '../service/loan-restructure-flag.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { FlagCodes } from 'app/entities/enumerations/flag-codes.model';

@Component({
  selector: 'jhi-loan-restructure-flag-update',
  templateUrl: './loan-restructure-flag-update.component.html',
})
export class LoanRestructureFlagUpdateComponent implements OnInit {
  isSaving = false;
  loanRestructureFlag: ILoanRestructureFlag | null = null;
  flagCodesValues = Object.keys(FlagCodes);

  editForm: LoanRestructureFlagFormGroup = this.loanRestructureFlagFormService.createLoanRestructureFlagFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected loanRestructureFlagService: LoanRestructureFlagService,
    protected loanRestructureFlagFormService: LoanRestructureFlagFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ loanRestructureFlag }) => {
      this.loanRestructureFlag = loanRestructureFlag;
      if (loanRestructureFlag) {
        this.updateForm(loanRestructureFlag);
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
    const loanRestructureFlag = this.loanRestructureFlagFormService.getLoanRestructureFlag(this.editForm);
    if (loanRestructureFlag.id !== null) {
      this.subscribeToSaveResponse(this.loanRestructureFlagService.update(loanRestructureFlag));
    } else {
      this.subscribeToSaveResponse(this.loanRestructureFlagService.create(loanRestructureFlag));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILoanRestructureFlag>>): void {
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

  protected updateForm(loanRestructureFlag: ILoanRestructureFlag): void {
    this.loanRestructureFlag = loanRestructureFlag;
    this.loanRestructureFlagFormService.resetForm(this.editForm, loanRestructureFlag);
  }
}
