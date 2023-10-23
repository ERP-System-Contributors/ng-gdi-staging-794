import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import {
  AgriculturalEnterpriseActivityTypeFormService,
  AgriculturalEnterpriseActivityTypeFormGroup,
} from './agricultural-enterprise-activity-type-form.service';
import { IAgriculturalEnterpriseActivityType } from '../agricultural-enterprise-activity-type.model';
import { AgriculturalEnterpriseActivityTypeService } from '../service/agricultural-enterprise-activity-type.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-agricultural-enterprise-activity-type-update',
  templateUrl: './agricultural-enterprise-activity-type-update.component.html',
})
export class AgriculturalEnterpriseActivityTypeUpdateComponent implements OnInit {
  isSaving = false;
  agriculturalEnterpriseActivityType: IAgriculturalEnterpriseActivityType | null = null;

  editForm: AgriculturalEnterpriseActivityTypeFormGroup =
    this.agriculturalEnterpriseActivityTypeFormService.createAgriculturalEnterpriseActivityTypeFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected agriculturalEnterpriseActivityTypeService: AgriculturalEnterpriseActivityTypeService,
    protected agriculturalEnterpriseActivityTypeFormService: AgriculturalEnterpriseActivityTypeFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ agriculturalEnterpriseActivityType }) => {
      this.agriculturalEnterpriseActivityType = agriculturalEnterpriseActivityType;
      if (agriculturalEnterpriseActivityType) {
        this.updateForm(agriculturalEnterpriseActivityType);
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
    const agriculturalEnterpriseActivityType = this.agriculturalEnterpriseActivityTypeFormService.getAgriculturalEnterpriseActivityType(
      this.editForm
    );
    if (agriculturalEnterpriseActivityType.id !== null) {
      this.subscribeToSaveResponse(this.agriculturalEnterpriseActivityTypeService.update(agriculturalEnterpriseActivityType));
    } else {
      this.subscribeToSaveResponse(this.agriculturalEnterpriseActivityTypeService.create(agriculturalEnterpriseActivityType));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAgriculturalEnterpriseActivityType>>): void {
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

  protected updateForm(agriculturalEnterpriseActivityType: IAgriculturalEnterpriseActivityType): void {
    this.agriculturalEnterpriseActivityType = agriculturalEnterpriseActivityType;
    this.agriculturalEnterpriseActivityTypeFormService.resetForm(this.editForm, agriculturalEnterpriseActivityType);
  }
}
