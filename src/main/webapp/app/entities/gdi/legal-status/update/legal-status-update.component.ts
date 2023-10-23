import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { LegalStatusFormService, LegalStatusFormGroup } from './legal-status-form.service';
import { ILegalStatus } from '../legal-status.model';
import { LegalStatusService } from '../service/legal-status.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-legal-status-update',
  templateUrl: './legal-status-update.component.html',
})
export class LegalStatusUpdateComponent implements OnInit {
  isSaving = false;
  legalStatus: ILegalStatus | null = null;

  editForm: LegalStatusFormGroup = this.legalStatusFormService.createLegalStatusFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected legalStatusService: LegalStatusService,
    protected legalStatusFormService: LegalStatusFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ legalStatus }) => {
      this.legalStatus = legalStatus;
      if (legalStatus) {
        this.updateForm(legalStatus);
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
    const legalStatus = this.legalStatusFormService.getLegalStatus(this.editForm);
    if (legalStatus.id !== null) {
      this.subscribeToSaveResponse(this.legalStatusService.update(legalStatus));
    } else {
      this.subscribeToSaveResponse(this.legalStatusService.create(legalStatus));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILegalStatus>>): void {
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

  protected updateForm(legalStatus: ILegalStatus): void {
    this.legalStatus = legalStatus;
    this.legalStatusFormService.resetForm(this.editForm, legalStatus);
  }
}
