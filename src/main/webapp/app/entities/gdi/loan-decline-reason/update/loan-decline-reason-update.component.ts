///
/// GDI STAGING - Mark VI No 3 (Phoebe Series) Client 0.0.1-SNAPSHOT
/// Copyright © 2023 ERP System Contributors (mailnjeru@gmail.com)
///
/// This program is free software: you can redistribute it and/or modify
/// it under the terms of the GNU General Public License as published by
/// the Free Software Foundation, either version 3 of the License, or
/// (at your option) any later version.
///
/// This program is distributed in the hope that it will be useful,
/// but WITHOUT ANY WARRANTY; without even the implied warranty of
/// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
/// GNU General Public License for more details.
///
/// You should have received a copy of the GNU General Public License
/// along with this program. If not, see <http://www.gnu.org/licenses/>.
///

import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { LoanDeclineReasonFormService, LoanDeclineReasonFormGroup } from './loan-decline-reason-form.service';
import { ILoanDeclineReason } from '../loan-decline-reason.model';
import { LoanDeclineReasonService } from '../service/loan-decline-reason.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-loan-decline-reason-update',
  templateUrl: './loan-decline-reason-update.component.html',
})
export class LoanDeclineReasonUpdateComponent implements OnInit {
  isSaving = false;
  loanDeclineReason: ILoanDeclineReason | null = null;

  editForm: LoanDeclineReasonFormGroup = this.loanDeclineReasonFormService.createLoanDeclineReasonFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected loanDeclineReasonService: LoanDeclineReasonService,
    protected loanDeclineReasonFormService: LoanDeclineReasonFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ loanDeclineReason }) => {
      this.loanDeclineReason = loanDeclineReason;
      if (loanDeclineReason) {
        this.updateForm(loanDeclineReason);
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
    const loanDeclineReason = this.loanDeclineReasonFormService.getLoanDeclineReason(this.editForm);
    if (loanDeclineReason.id !== null) {
      this.subscribeToSaveResponse(this.loanDeclineReasonService.update(loanDeclineReason));
    } else {
      this.subscribeToSaveResponse(this.loanDeclineReasonService.create(loanDeclineReason));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILoanDeclineReason>>): void {
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

  protected updateForm(loanDeclineReason: ILoanDeclineReason): void {
    this.loanDeclineReason = loanDeclineReason;
    this.loanDeclineReasonFormService.resetForm(this.editForm, loanDeclineReason);
  }
}
