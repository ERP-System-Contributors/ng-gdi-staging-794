import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { SecurityClassificationTypeFormService, SecurityClassificationTypeFormGroup } from './security-classification-type-form.service';
import { ISecurityClassificationType } from '../security-classification-type.model';
import { SecurityClassificationTypeService } from '../service/security-classification-type.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-security-classification-type-update',
  templateUrl: './security-classification-type-update.component.html',
})
export class SecurityClassificationTypeUpdateComponent implements OnInit {
  isSaving = false;
  securityClassificationType: ISecurityClassificationType | null = null;

  editForm: SecurityClassificationTypeFormGroup = this.securityClassificationTypeFormService.createSecurityClassificationTypeFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected securityClassificationTypeService: SecurityClassificationTypeService,
    protected securityClassificationTypeFormService: SecurityClassificationTypeFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ securityClassificationType }) => {
      this.securityClassificationType = securityClassificationType;
      if (securityClassificationType) {
        this.updateForm(securityClassificationType);
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
    const securityClassificationType = this.securityClassificationTypeFormService.getSecurityClassificationType(this.editForm);
    if (securityClassificationType.id !== null) {
      this.subscribeToSaveResponse(this.securityClassificationTypeService.update(securityClassificationType));
    } else {
      this.subscribeToSaveResponse(this.securityClassificationTypeService.create(securityClassificationType));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISecurityClassificationType>>): void {
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

  protected updateForm(securityClassificationType: ISecurityClassificationType): void {
    this.securityClassificationType = securityClassificationType;
    this.securityClassificationTypeFormService.resetForm(this.editForm, securityClassificationType);
  }
}
