import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { SecurityTypeFormService, SecurityTypeFormGroup } from './security-type-form.service';
import { ISecurityType } from '../security-type.model';
import { SecurityTypeService } from '../service/security-type.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-security-type-update',
  templateUrl: './security-type-update.component.html',
})
export class SecurityTypeUpdateComponent implements OnInit {
  isSaving = false;
  securityType: ISecurityType | null = null;

  editForm: SecurityTypeFormGroup = this.securityTypeFormService.createSecurityTypeFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected securityTypeService: SecurityTypeService,
    protected securityTypeFormService: SecurityTypeFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ securityType }) => {
      this.securityType = securityType;
      if (securityType) {
        this.updateForm(securityType);
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
    const securityType = this.securityTypeFormService.getSecurityType(this.editForm);
    if (securityType.id !== null) {
      this.subscribeToSaveResponse(this.securityTypeService.update(securityType));
    } else {
      this.subscribeToSaveResponse(this.securityTypeService.create(securityType));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISecurityType>>): void {
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

  protected updateForm(securityType: ISecurityType): void {
    this.securityType = securityType;
    this.securityTypeFormService.resetForm(this.editForm, securityType);
  }
}
