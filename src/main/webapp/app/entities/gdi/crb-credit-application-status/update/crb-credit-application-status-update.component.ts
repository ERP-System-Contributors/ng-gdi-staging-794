import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { CrbCreditApplicationStatusFormService, CrbCreditApplicationStatusFormGroup } from './crb-credit-application-status-form.service';
import { ICrbCreditApplicationStatus } from '../crb-credit-application-status.model';
import { CrbCreditApplicationStatusService } from '../service/crb-credit-application-status.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-crb-credit-application-status-update',
  templateUrl: './crb-credit-application-status-update.component.html',
})
export class CrbCreditApplicationStatusUpdateComponent implements OnInit {
  isSaving = false;
  crbCreditApplicationStatus: ICrbCreditApplicationStatus | null = null;

  editForm: CrbCreditApplicationStatusFormGroup = this.crbCreditApplicationStatusFormService.createCrbCreditApplicationStatusFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected crbCreditApplicationStatusService: CrbCreditApplicationStatusService,
    protected crbCreditApplicationStatusFormService: CrbCreditApplicationStatusFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ crbCreditApplicationStatus }) => {
      this.crbCreditApplicationStatus = crbCreditApplicationStatus;
      if (crbCreditApplicationStatus) {
        this.updateForm(crbCreditApplicationStatus);
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
    const crbCreditApplicationStatus = this.crbCreditApplicationStatusFormService.getCrbCreditApplicationStatus(this.editForm);
    if (crbCreditApplicationStatus.id !== null) {
      this.subscribeToSaveResponse(this.crbCreditApplicationStatusService.update(crbCreditApplicationStatus));
    } else {
      this.subscribeToSaveResponse(this.crbCreditApplicationStatusService.create(crbCreditApplicationStatus));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICrbCreditApplicationStatus>>): void {
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

  protected updateForm(crbCreditApplicationStatus: ICrbCreditApplicationStatus): void {
    this.crbCreditApplicationStatus = crbCreditApplicationStatus;
    this.crbCreditApplicationStatusFormService.resetForm(this.editForm, crbCreditApplicationStatus);
  }
}
